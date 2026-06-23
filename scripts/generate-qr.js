const fs = require('fs');
const path = require('path');

async function downloadQR() {
  // Use the brand color #1f5d50 as the QR code color on a white background
  const url = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://www.compassioncrew.in/share-story&color=1f5d50&bgcolor=ffffff';
  const outputPath = path.join(__dirname, '..', 'public', 'images', 'share-story-qr.png');
  
  console.log('Fetching themed QR code...');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
  
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  // Ensure the directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully saved themed QR code image to: ${outputPath}`);
}

downloadQR().catch(err => {
  console.error('Error generating QR code:', err);
  process.exit(1);
});
