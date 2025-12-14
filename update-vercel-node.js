// Script to update Vercel project Node.js version
const https = require('https');

const projectName = 'portfolio-builder';
const teamId = 'kanishka973s-projects';
const nodeVersion = '20.x';

// This requires VERCEL_TOKEN environment variable
// Run: $env:VERCEL_TOKEN="your-token"; node update-vercel-node.js

const token = process.env.VERCEL_TOKEN;
if (!token) {
  console.error('Please set VERCEL_TOKEN environment variable');
  console.error('Get your token from: https://vercel.com/account/tokens');
  process.exit(1);
}

const options = {
  hostname: 'api.vercel.com',
  path: `/v9/projects/${projectName}?teamId=${teamId}`,
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
};

const data = JSON.stringify({
  nodeVersion: nodeVersion
});

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log(`✅ Successfully updated Node.js version to ${nodeVersion}`);
    } else {
      console.error(`❌ Error: ${res.statusCode}`);
      console.error(body);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
});

req.write(data);
req.end();


