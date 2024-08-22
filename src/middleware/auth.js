const ipWhitelist = async (req, res, next) => {
  try {
      // Whitelisted IP addresses
      const allowedIPs = ['202.47.38.217']; // Add the IPs you want to whitelist

      // Get the requester's IP address
      const requesterIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

      // Clean IP address (remove "::ffff:" prefix for IPv4 mapped addresses)
      const cleanedIP = requesterIP.replace(/^::ffff:/, '');

      // Check if the IP is in the whitelist
      if (allowedIPs.includes(cleanedIP)) {
          // If IP is whitelisted, proceed to the next middleware or route
          next();
      } else {
          // If IP is not whitelisted, send a 403 Forbidden response
          res.status(403).json({ message: 'Access forbidden: Your IP is not authorized to access this resource.' });
      }
  } catch (error) {
      // Log and respond with server error in case of failure
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
};

module.exports = { ipWhitelist };
