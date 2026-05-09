// middleware/subscription.middleware.js

export const checkSubscription = (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // ✅ Free access allowed
  if (req.test?.isFree) return next();

  // ❌ Not subscribed
  if (!user.isSubscribed) {
    return res.status(403).json({
      message: "Subscription required"
    });
  }

  // ❌ Expired
  if (new Date(user.subscriptionExpires) < new Date()) {
    return res.status(403).json({
      message: "Subscription expired"
    });
  }

  next();
};