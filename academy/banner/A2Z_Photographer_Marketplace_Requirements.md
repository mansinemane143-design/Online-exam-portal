# A2Z Photographer Marketplace — Website Requirement Document

## 1. प्रोजेक्ट Overview

A2Z Photographer Marketplace ही एक website आहे जिथे customers त्यांच्या area/gharacca नुसार photographers शोधून book करू शकतील (wedding, pre-wedding, baby shoot, corporate event, product photography इ.). Photographers स्वतःचं portfolio, packages आणि availability manage करू शकतील.

तीन प्रकारचे users:
1. **Customer** — photographer शोधतो व book करतो
2. **Photographer (Vendor)** — service list करतो
3. **Admin** — संपूर्ण platform manage करतो

---

## 2. Website Pages

### A) Public / Customer Side
| Page | उद्देश |
|---|---|
| Home Page | Featured photographers, categories, search bar, banners |
| Search & Filter | Location, category, price range, rating नुसार filter |
| Category Page | Wedding / Pre-wedding / Baby Shoot / Corporate / Event इ. |
| Photographer Profile | Portfolio gallery, packages, pricing, reviews, availability calendar |
| Booking Page | Date, time, package select, add-ons |
| Cart / Checkout | Payment gateway integration |
| Payment Success/Failure Page | Booking confirmation |
| My Bookings | Booking history, status track |
| Chat/Inbox | Customer-Photographer messaging |
| Reviews & Rating | Post-service review submit |
| Login / Signup | Email/Mobile OTP, Google login |
| User Profile/Settings | Personal info, saved addresses |
| Wishlist/Favorites | Save photographers for later |
| Notifications Page | Booking updates, offers |
| About Us / Contact Us | Static pages |
| Terms & Conditions / Privacy Policy | Legal pages |
| Help/FAQ Page | Support |

### B) Photographer (Vendor) Side
| Page | उद्देश |
|---|---|
| Vendor Registration/Onboarding | KYC docs, business info, portfolio upload |
| Vendor Dashboard | Bookings summary, earnings, ratings overview |
| Portfolio Management | Photos/videos upload, categorize |
| Package/Pricing Management | Basic/Standard/Premium packages set |
| Availability Calendar | Available/blocked dates manage |
| Booking Requests | Accept/Reject/Reschedule |
| Earnings & Payouts | Transaction history, withdrawal |
| Chat/Inbox | Customer messages |
| Reviews Received | Feedback view |
| Profile Settings | Business details update |

### C) Admin Panel
| Page | उद्देश |
|---|---|
| Admin Dashboard | Total users, bookings, revenue overview |
| Photographer Verification | New vendor approve/reject (KYC check) |
| User Management | Customers/vendors list, block/unblock |
| Booking Management | All bookings monitor |
| Commission/Payment Settings | Platform commission %, payout rules |
| Category Management | Add/edit service categories |
| Reports & Analytics | Revenue reports, growth stats |
| Dispute/Complaint Management | Customer-vendor issue resolve |
| Content Management (CMS) | Banners, offers, static pages edit |
| Notification Management | Push/email campaign |

---

## 3. मुख्य Features

- Location-based photographer search (city/pincode/GPS)
- Category-wise browsing & advanced filters (price, rating, availability)
- Package-based pricing system
- Real-time chat between customer & photographer
- Online booking with calendar availability
- Payment gateway (Razorpay / Stripe / PayU)
- Rating & review system with photo/video proof
- Admin commission-based revenue model
- Portfolio gallery (image + video support)
- Email/SMS/Push notifications
- Responsive design (mobile + desktop दोन्हीवर चालेल)
- SEO-friendly URLs (photographer profiles, categories)

---

## 4. Recommended Tech Stack (Website)

| भाग | Technology Options |
|---|---|
| Frontend | React.js / Next.js (SEO साठी Next.js better) |
| Styling | Tailwind CSS |
| Backend | Node.js (Express) किंवा Django/Laravel |
| Database | PostgreSQL / MySQL (structured data), MongoDB (chat/portfolio media metadata) |
| Authentication | Firebase Auth / JWT + OTP (Twilio/MSG91) |
| File/Image Storage | AWS S3 / Cloudinary |
| Payment Gateway | Razorpay / Stripe (India साठी Razorpay recommended) |
| Real-time Chat | Socket.io / Firebase Realtime DB |
| Hosting | AWS / Vercel (frontend) + Render/Railway (backend) |
| Admin Panel | React Admin / Custom dashboard |
| Maps/Location | Google Maps API |

---

## 5. Revenue Model (Suggested)

- Commission per booking (उदा. 10-15%)
- Featured/Premium listing charges for photographers
- Subscription plans for vendors (Basic/Pro/Elite)

---

## 6. Development Phases (Suggested)

1. **Phase 1** — Core: Auth, Photographer listing, Search, Profile pages
2. **Phase 2** — Booking system + Payment integration
3. **Phase 3** — Chat, Reviews, Notifications
4. **Phase 4** — Admin panel + Analytics
5. **Phase 5** — Testing, SEO optimization, Launch
