import benefits from "../assets/product-gallery/benefits.webp";
import cleanIcons from "../assets/product-gallery/clean-icons.webp";
import first from "../assets/product-gallery/first.webp";
import keychainGift from "../assets/product-gallery/keychain-gift.webp";
import newPackaging from "../assets/product-gallery/new-packaging.webp";
import oneIngredient from "../assets/product-gallery/one-ingredient.webp";
import review from "../assets/product-gallery/review.webp";
import steps from "../assets/product-gallery/steps.webp";
import tableNutrition from "../assets/product-gallery/table-nutrition.webp";

import bananaBreadThumb from "../assets/ubi-reels/thumbnails/banana-bread.webp";
import bananaBreadVideo from "../assets/ubi-reels/videos/banana-bread.mp4";
import cinnamonRollsThumb from "../assets/ubi-reels/thumbnails/cinnamon-rolls.webp";
import cinnamonRollsVideo from "../assets/ubi-reels/videos/cinnamon-rolls.mp4";
import coconutCoffeeThumb from "../assets/ubi-reels/thumbnails/coconut-coffee.webp";
import coconutCoffeeVideo from "../assets/ubi-reels/videos/coconut-coffee.mp4";
import crinklesThumb from "../assets/ubi-reels/thumbnails/crinkles.webp";
import crinklesVideo from "../assets/ubi-reels/videos/crinkles.mp4";
import iceCreamThumb from "../assets/ubi-reels/thumbnails/ice-cream.webp";
import iceCreamVideo from "../assets/ubi-reels/videos/ice-cream.mp4";
import icedLatteThumb from "../assets/ubi-reels/thumbnails/iced-latte.webp";
import icedLatteVideo from "../assets/ubi-reels/videos/iced-latte.mp4";
import latteArtThumb from "../assets/ubi-reels/thumbnails/latte-art.webp";
import latteArtVideo from "../assets/ubi-reels/videos/latte-art.mp4";
import matchaLatteThumb from "../assets/ubi-reels/thumbnails/matcha-latte.webp";
import matchaLatteVideo from "../assets/ubi-reels/videos/matcha-latte.mp4";
import onePieceThumb from "../assets/ubi-reels/thumbnails/one-piece.webp";
import onePieceVideo from "../assets/ubi-reels/videos/one-piece.mp4";
import pinaColadaThumb from "../assets/ubi-reels/thumbnails/pina-colada.webp";
import pinaColadaVideo from "../assets/ubi-reels/videos/pina-colada.mp4";
import puffPastryThumb from "../assets/ubi-reels/thumbnails/puff-pastry.webp";
import puffPastryVideo from "../assets/ubi-reels/videos/puff-pastry.mp4";
import tresLecheThumb from "../assets/ubi-reels/thumbnails/tres-leche.webp";
import tresLecheVideo from "../assets/ubi-reels/videos/tres-leche.mp4";
import ubiBreadThumb from "../assets/ubi-reels/thumbnails/ubi-bread.webp";
import ubiBreadVideo from "../assets/ubi-reels/videos/ubi-bread.mp4";

import firstStepVideo from "../assets/prep-videos/first-step.mp4";
import secondStepVideo from "../assets/prep-videos/second-step.mp4";
import thirdStepVideo from "../assets/prep-videos/third-step.mp4";

export const galleryItems = [
  { src: first, alt: "UBIYAM product shot" },
  { src: benefits, alt: "Benefits icons and product" },
  { src: cleanIcons, alt: "Clean ingredients icons" },
  { src: keychainGift, alt: "Free keychain gift" },
  { src: newPackaging, alt: "New packaging" },
  { src: oneIngredient, alt: "One ingredient message" },
  { src: review, alt: "Verified customer review" },
  { src: steps, alt: "4 step latte recipe" },
  { src: tableNutrition, alt: "Nutrition facts table" },
];

export const productAccordionItems = [
  {
    summary: "Ingredients",
    details: "100% Organic UBE Powder (Purple Yam). Nothing else.",
  },
  {
    summary: "What does real ube taste like?",
    details: `
      Real ube is softly sweet, earthy and nutty, with gentle vanilla notes, more delicate than the ube ice cream you may know. That dessert intensity comes from extracts and added sugar; UBIYAM is the actual yam, nothing added.
      Make it yours: 1 teaspoon for a soft, subtle latte · 2 teaspoons for a bold, dessert-style cup.
    `,
  },
  {
    summary: "From farm to pouch",
    details: "Our ube is grown and harvested in the Philippines, then gently dried, milled and packed in a GMP-certified facility. Every batch is lab tested for purity, no coloring, no fillers, one ingredient.",
  },
  {
    summary: "Storage & Freshness",
    details: "Keep in a cool, dry place, away from heat and sunlight. Seal the pouch tightly after opening.",
  },
  {
    summary: "Shipping & Delivery",
    details: `
      Every order ships with full tracking. Orders are processed within 1-3 business days, and once shipped, delivery typically takes 5 - 9 business days.
      We currently ship to the United States, the United Kingdom, Australia, Canada, Belgium, France, Germany, the Netherlands, Spain, Switzerland, the United Arab Emirates, Qatar, Saudi Arabia, Kuwait, Oman and Bahrain.
      Shipping fees and free-shipping thresholds vary by country you'll see the exact amount at checkout, and the full table is on our Shipping Policy page.
      All duties and import taxes are included in the price you pay. There is nothing extra to pay on delivery.
      You'll receive your tracking link by email as soon as your order is on the way, and you can also follow your parcel anytime via the Track Your Order page.
    `,
  },
];

export const ritualVideoItems = [
  { thumbnail: matchaLatteThumb, src: matchaLatteVideo },
  { thumbnail: puffPastryThumb, src: puffPastryVideo },
  { thumbnail: pinaColadaThumb, src: pinaColadaVideo },
  { thumbnail: bananaBreadThumb, src: bananaBreadVideo },
  { thumbnail: icedLatteThumb, src: icedLatteVideo },
  { thumbnail: ubiBreadThumb, src: ubiBreadVideo },
  { thumbnail: coconutCoffeeThumb, src: coconutCoffeeVideo },
  { thumbnail: cinnamonRollsThumb, src: cinnamonRollsVideo },
  { thumbnail: latteArtThumb, src: latteArtVideo },
  { thumbnail: iceCreamThumb, src: iceCreamVideo },
  { thumbnail: tresLecheThumb, src: tresLecheVideo },
  { thumbnail: crinklesThumb, src: crinklesVideo },
  { thumbnail: onePieceThumb, src: onePieceVideo },
];

export const traceabilityAccordionItems = [
  {
    summary: "🇵🇭 Grown in the Philippines",
    details: "Authentic purple yam (Dioscorea alata), harvested at peak season for deep natural color and sweetness.",
  },
  {
    summary: "🏭 Milled & packed under GMP standards",
    details: "Gently dried at low temperatures, finely milled and sealed in a GMP-certified facility to preserve nutrients, color and freshness.",
  },
  {
    summary: "🔬 Lab tested, every batch",
    details: "Each batch is tested for purity and quality. No food coloring, no fillers, no additives, if it isn't pure ube, it doesn't ship.",
  },
];

export const trustedSuperfoodAccordionItems = [
  {
    summary: "🍠 Rich in Natural Antioxidants",
    details: "Ube's deep purple hue comes from anthocyanins, powerful plant compounds that help protect your cells from oxidative stress and support overall vitality.",
  },
  {
    summary: "🌿 Naturally Contains Fiber",
    details: "Naturally containing fiber, UBIYAM supports everyday digestion.",
  },
  {
    summary: "⚡ Clean, Caffeine-Free Energy",
    details: "Complex carbohydrates provide smooth, sustained energy without spikes or crashes.",
  },
  {
    summary: "🛡️ Daily Nutrient Support",
    details: "A naturally nutrient-dense root to complement your balanced lifestyle.",
  },
  {
    summary: "✨ Simple Ingredient. Powerful Routine.",
    details: "One ingredient. Endless ways to nourish your day.",
  },
];

export const lattePrepItems = [
  {
    src: firstStepVideo,
    summary: "First Step",
    details: "Scoop 1 teaspoon (4g) of Ube powder into your favorite mug or glass. Add a splash of hot water (not boiling) to activate the powder.",
  },
  {
    src: secondStepVideo,
    summary: "Second Step",
    details: "Whisk into a smooth, glossy purple paste using a small whisk or frother, no lumps.",
  },
  {
    src: thirdStepVideo,
    summary: "Third Step",
    details: "Top up with your milk of choice, almond, oat, coconut, or dairy. Warm, frothy, or iced… it's your call.",
  },
];

export const comparisonFeatures = [
  "Single Ingredient",
  "Zero Added Sugar",
  "USDA Organic",
  "Real UBE",
  "Non-GMO",
  "No Food Coloring",
  "Lab Tested",
  "Grown in the Philippines",
];