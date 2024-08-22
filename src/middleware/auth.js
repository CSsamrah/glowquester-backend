
// Whitelisted IP addresses
const allowedIPs = ['202.47.38.217']; // Add the IPs you want to whitelist

// Middleware to check if the request's IP is whitelisted
function ipWhitelist(req, res, next) {
  // Get the requester's IP address
  const requesterIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Clean IP address (remove "::ffff:" prefix for IPv4 mapped addresses)
  const cleanedIP = requesterIP.replace(/^::ffff:/, '');

  if (allowedIPs.includes(cleanedIP)) {
    // If IP is whitelisted, proceed to the next middleware or route
    next();
  } else {
    // If IP is not whitelisted, send a 403 Forbidden response
    res.status(403).json({ message: 'Access forbidden: Your IP is not authorized to access this resource.' });
  }
}

module.exports={ipWhitelist}