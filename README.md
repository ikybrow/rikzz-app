# QRIS Static to Dynamic Converter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow.svg)](https://www.javascript.com/)
[![Made with HTML5](https://img.shields.io/badge/Made%20with-HTML5-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Made with CSS3](https://img.shields.io/badge/Made%20with-CSS3-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)

A modern, secure, and user-friendly web application that converts static QRIS codes to dynamic QRIS codes with customizable transaction amounts and service fees. Built with vanilla JavaScript, HTML5, and CSS3, featuring a beautiful glassmorphism design and 100% client-side processing for maximum privacy and security.

## ✨ Features

- **🔒 100% Client-Side Processing** - All data processing happens locally in your browser
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **🎨 Modern UI/UX** - Beautiful glassmorphism design with aurora background effects
- **📊 QRIS Code Parsing** - Automatically extracts merchant information from static QRIS codes
- **💰 Dynamic Amount Generation** - Convert static QRIS to dynamic QRIS with custom amounts
- **💳 Service Fee Support** - Add percentage or fixed amount service fees
- **🖼️ Image Upload** - Support for various image formats (PNG, JPG, JPEG, etc.)
- **📱 Instant QR Generation** - Real-time dynamic QRIS code generation
- **🌐 Offline Capable** - Works without internet connection after initial load

## 🚀 Live Demo

https://qris-statis-to-dyanmic-converter.vercel.app/

## 📋 Prerequisites

- Modern web browser with JavaScript enabled
- No additional software installation required
- Works on all major browsers (Chrome, Firefox, Safari, Edge)

## 🛠️ Installation

### Option 1: Direct Download
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start using the application immediately

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/hezqilzaidan/qris-statis-to-dyanmic-converter.git

# Navigate to the project directory
cd qris-static-to-dynamic-converter

# Open in your preferred code editor
code .
```

### Option 3: Deploy to Web Server
1. Upload all files to your web server
2. Ensure the server supports static file hosting
3. Access via your domain

## 📖 Usage

### Basic Workflow
1. **Upload QRIS Image**: Click the upload area and select your static QRIS image
2. **Review Merchant Info**: The application will display extracted merchant information
3. **Set Transaction Amount**: Enter the desired transaction amount
4. **Configure Service Fee** (Optional): Choose between percentage or fixed amount fees
5. **Generate Dynamic QRIS**: Click "Cetak QRIS Dinamis" to generate the new code
6. **Download/Use**: The dynamic QRIS code is ready for use

### Advanced Features
- **Service Fee Types**:
  - **Percentage**: Add a percentage-based fee (e.g., 2.5%)
  - **Fixed Amount**: Add a fixed fee amount (e.g., Rp 1,000)
- **Amount Formatting**: Automatic Indonesian Rupiah formatting
- **Real-time Preview**: See changes as you type

## 🏗️ Project Structure

```
qris-static-to-dynamic/
├── index.html          # Main HTML file with responsive layout
├── script.js           # Core JavaScript functionality
├── styles.css          # Modern CSS with glassmorphism design
├── README.md           # This documentation file
└── LICENSE             # MIT License
```

## 🔧 Technical Details

### Core Technologies
- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Advanced styling with glassmorphism, animations, and responsive design
- **Vanilla JavaScript**: No frameworks, pure ES6+ JavaScript
- **QR Code Libraries**: 
  - `qrcode.js` for QR code generation
  - `jsQR` for QR code parsing

### Key Features
- **Image Processing**: Canvas-based image handling and QR code extraction
- **QRIS Parsing**: Indonesian QRIS standard compliance
- **Form Validation**: Client-side input validation and formatting
- **Responsive Layout**: Two-column design that adapts to screen size
- **Accessibility**: ARIA labels and keyboard navigation support

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🔒 Security & Privacy

- **No Server Communication**: All processing happens locally in your browser
- **No Data Storage**: No personal or transaction data is stored anywhere
- **No Tracking**: No analytics or tracking scripts
- **Open Source**: Transparent code for security review

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and formatting
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

## 🐛 Bug Reports

If you encounter any bugs or issues, please:
1. Check the browser console for error messages
2. Ensure you're using a supported browser version
3. Try refreshing the page
4. Submit a detailed bug report with:
   - Browser and version
   - Operating system
   - Steps to reproduce
   - Expected vs. actual behavior

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **QRIS Standard**: Indonesian QRIS implementation guidelines
- **Open Source Libraries**: 
  - [qrcode.js](https://github.com/davidshimjs/qrcodejs) for QR generation
  - [jsQR](https://github.com/cozmo/jsQR) for QR parsing
- **Design Inspiration**: Modern glassmorphism and aurora effects
- **Community**: All contributors and users who provided feedback

## 📞 Support

- **Email**: hezqilrahmady@gmail.com 

---

**Made with ❤️ by HezqilZaidan**

*This project is not affiliated with any official QRIS organization. It's an open-source tool for educational and practical purposes.*
