// Select DOM elements
const qrisForm = document.getElementById('qrisForm');
const qrisImageInput = document.getElementById('qrisImageInput');
const qrisCanvas = document.getElementById('qrisCanvas');
const amountInput = document.getElementById('amountInput');
const realAmountInput = document.getElementById('realAmountInput');
const serviceFee = document.getElementById('serviceFee');
const serviceFeeOptions = document.getElementById('serviceFeeOptions');
const feeType = document.getElementById('feeType');
const feeValue = document.getElementById('feeValue');
const qrcodeElement = document.getElementById('qrcode');
const merchantInfoElement = document.getElementById('merchant-info-wrapper');
const merchantInfoWrapper = document.getElementById('merchant-info-wrapper');
const qrisResultWrapper = document.getElementById('qris-result-wrapper');

let qrisStaticCode = '';

// Check if all required DOM elements exist
if (!merchantInfoWrapper || !qrisResultWrapper) {
  console.error('Required DOM elements not found:', {
    merchantInfoWrapper: !!merchantInfoWrapper,
    qrisResultWrapper: !!qrisResultWrapper
  });
}

// Event listeners
qrisImageInput.addEventListener('change', handleImageUpload);
serviceFee.addEventListener('change', toggleServiceFeeOptions);
qrisForm.addEventListener('submit', handleFormSubmit);
amountInput.addEventListener('input', formatAmountInput);
amountInput.addEventListener('blur', handleEmptyAmountInput);

function formatAmountInput(e) {
  let value = e.target.value.replace(/[^\d]/g, "");

  if (value !== "") {
    e.target.value = formatRupiah(value);
    realAmountInput.value = value;
  } else {
    realAmountInput.value = 0;
    e.target.value = "";
  }
}

function handleEmptyAmountInput(e) {
  const value = e.target.value;

  if (!value || value === "Rp 0") {
    e.target.value = "Rp 0";
    realAmountInput.value = 0;
  }
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  // Reset state untuk upload baru
  resetState();
  
  const reader = new FileReader();
  reader.onload = (event) => processImage(event.target.result);
  reader.readAsDataURL(file);
}

function resetState() {
  // Reset QRIS static code
  qrisStaticCode = '';
  
  // Sembunyikan merchant info dan result dengan error handling
  if (merchantInfoWrapper) {
    merchantInfoWrapper.style.display = 'none';
  }
  
  if (qrisResultWrapper) {
    qrisResultWrapper.style.display = 'none';
  }
  
  // Clear form inputs
  if (amountInput) amountInput.value = '';
  if (realAmountInput) realAmountInput.value = '';
  if (serviceFee) serviceFee.value = 'n';
  if (serviceFeeOptions) serviceFeeOptions.style.display = 'none';
  if (feeType) feeType.value = 'r';
  if (feeValue) feeValue.value = '';
  
  // Clear QR code
  if (qrcodeElement) qrcodeElement.innerHTML = '';
  
  // Clear merchant info
  if (merchantInfoElement) merchantInfoElement.innerHTML = '';
}

function processImage(imageSrc) {
  const img = new Image();
  img.onload = () => {
    qrisCanvas.width = img.width;
    qrisCanvas.height = img.height;

    const ctx = qrisCanvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageData = ctx.getImageData(0, 0, qrisCanvas.width, qrisCanvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      qrisStaticCode = code.data;
      localStorage.setItem('qrisStaticCode', qrisStaticCode);
      alert('QRIS Static Code berhasil dibaca!');
      
      // Tampilkan merchant info wrapper dengan error handling
      if (merchantInfoWrapper) {
        merchantInfoWrapper.style.display = 'block';
      }
      displayMerchantInfo(qrisStaticCode);
    } else {
      alert('Tidak dapat membaca QRIS code dari gambar. Pastikan gambar berisi QRIS code yang valid.');
      
      // Sembunyikan merchant info wrapper jika scan gagal dengan error handling
      if (merchantInfoWrapper) {
        merchantInfoWrapper.style.display = 'none';
      }
      qrisStaticCode = '';
    }
  };
  img.src = imageSrc;
}

function toggleServiceFeeOptions() {
  serviceFeeOptions.style.display = serviceFee.value === 'y' ? 'block' : 'none';
}

function handleFormSubmit(e) {
  e.preventDefault();

  if (!qrisStaticCode) {
    alert('Harap upload gambar QRIS Static terlebih dahulu!');
    return;
  }

  const nominal = realAmountInput.value.trim();
  if (!nominal || nominal === "0") {
    alert('Nominal harus diisi!');
    return;
  }

  const useServiceFee = serviceFee.value;
  const feeTypeValue = feeType.value;
  const feeValueAmount = feeValue.value.trim();

  const dynamicQRIS = convertToDynamicQRIS(qrisStaticCode, nominal, useServiceFee, feeTypeValue, feeValueAmount);
  displayResult(dynamicQRIS);
  displayMerchantInfo(qrisStaticCode);
}

function convertToDynamicQRIS(qris, nominal, useServiceFee, feeType, feeValue) {
  let tax = '';

  if (useServiceFee === 'y') {
    tax = feeType === 'r'
      ? "55020256" + String(feeValue.length).padStart(2, '0') + feeValue
      : "55020357" + String(feeValue.length).padStart(2, '0') + feeValue;
  }

  qris = qris.slice(0, -4).replace("010211", "010212");

  const [prefix, suffix] = qris.split("5802ID");
  const nominalData = "54" + String(nominal.length).padStart(2, '0') + nominal;

  const resultQRIS = `${prefix}${nominalData}${tax || ''}5802ID${suffix}${convertCRC16(prefix + nominalData + tax + "5802ID" + suffix)}`;
  return resultQRIS;
}

function convertCRC16(str) {
  let crc = 0xFFFF;
  for (let c = 0; c < str.length; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

function displayResult(dynamicQRIS) {
  if (qrcodeElement) {
    qrcodeElement.innerHTML = '';
    new QRCode(qrcodeElement, {
      correctLevel: QRCode.CorrectLevel.M,
      text: dynamicQRIS,
      width: 256,
      height: 256,
    });
  }
  
  // Tampilkan QRIS result wrapper dengan error handling
  if (qrisResultWrapper) {
    qrisResultWrapper.style.display = 'block';
  }
}

function extractMerchantInfo(qrisCode) {
  const merchantNameRegex = /59(\d{2})([^\d]{2,})/;
  const merchantLocationRegex = /60(\d{2})([^\d]{2,})/;

  const nameMatch = qrisCode.match(merchantNameRegex);
  const locationMatch = qrisCode.match(merchantLocationRegex);

  const merchantName = nameMatch ? nameMatch[2].substring(0, parseInt(nameMatch[1], 10)) : "Tidak diketahui";
  const merchantLocation = locationMatch ? locationMatch[2].substring(0, parseInt(locationMatch[1], 10)) : "Tidak diketahui";

  return { name: merchantName, location: merchantLocation };
}

function displayMerchantInfo(qrisCode) {
  const merchantInfo = extractMerchantInfo(qrisCode);
  if (merchantInfoElement) {
    merchantInfoElement.innerHTML = `
      <h3 class="merchant-info__title">Informasi Merchant:</h3>
      <p class="merchant-info__text"><strong>Nama:</strong> ${merchantInfo.name}</p>
      <p class="merchant-info__text"><strong>Lokasi:</strong> ${merchantInfo.location}</p>
    `;
  }
}

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}

// === Efek Splash Cursor ===
const splashCursor = document.getElementById('cursor-splash');

window.addEventListener('mousemove', (e) => {
  // Dapatkan koordinat X dan Y dari mouse
  const { clientX, clientY } = e;

  // Perbarui posisi elemen splash agar mengikuti mouse
  splashCursor.style.left = `${clientX}px`;
  splashCursor.style.top = `${clientY}px`;
});
