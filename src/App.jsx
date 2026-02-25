import React, { useState, useRef, useEffect, useCallback } from 'react';

// ============================================
// ⚙️ SOZLAMALAR
// ============================================

const CONFIG = {
  centerName: "ROBOSCHOOL",
  foundedYear: "2019",
  founder: "Rasul Israilov",
  phone: "+998 99 405 32 48",
  telegram: "@rasul_israilov",
  instagram: "@rasul_israiov",
  telegramChannel: "https://t.me/roboschool_chinoz",
  graduates: "800+",
  
  // 🔐 TELEGRAM BOT SOZLAMALARI
TELEGRAM_BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "",
TELEGRAM_CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID || "",
  address: {
    region: "Toshkent viloyati",
    district: "Chinoz tumani", 
    city: "Chinoz shahri",
    street: "Sh.Rashidov ko'chasi, 90-uy",
    landmark: "Chinoz hokimiyatiga yetmasdan, Sofia ro'parasi",
    floor: "2-qavat",
    mfy: "Xamza MFY"
  },
  workHours: "Dushanba-Shanba: 09:00 - 18:00"
};

// ============================================
// 📨 TELEGRAM GA XABAR YUBORISH
// ============================================

const sendToTelegram = async (userData) => {
  const botToken = CONFIG.TELEGRAM_BOT_TOKEN;
  const chatId = CONFIG.TELEGRAM_CHAT_ID;
  
  if (botToken === "YOUR_BOT_TOKEN_HERE") {
    console.log("⚠️ Telegram bot token o'rnatilmagan!");
    console.log("📋 Yangi mijoz:", userData);
    return false;
  }
  
  const now = new Date();
  const dateStr = now.toLocaleDateString('uz-UZ', { 
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
  
  const message = `
🆕 *YANGI MIJOZ!*

👤 *Ism:* ${userData.name}
📞 *Telefon:* +998 ${userData.phone}
🎂 *Yosh:* ${userData.age}
📚 *Kurs:* ${userData.course}

📅 *Sana:* ${dateStr}
🌐 *Manba:* Web Chatbot
━━━━━━━━━━━━━━━━━━
🤖 Roboschool AI Chatbot
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
      }
    );
    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error("❌ Telegram xatolik:", error);
    return false;
  }
};

// ============================================
// 🎭 JONLI AI EFFEKTLARI
// ============================================

const THINKING_MESSAGES = [
  "O'ylayapman...", "Javob tayyorlamoqda...", "Ma'lumot qidirmoqda...",
  "Analiz qilmoqda...", "Bir soniya...", "Tekshirmoqda..."
];

const getRandomThinkingMessage = () => THINKING_MESSAGES[Math.floor(Math.random() * THINKING_MESSAGES.length)];
const getThinkingDelay = (length, isComplex) => 500 + Math.min(length * 2, 800) + (isComplex ? 600 : 0) + Math.random() * 400;

// ============================================
// 📚 KURSLAR
// ============================================

const COURSES = [
  { id: 'lego', name: "Lego WeDo", emoji: "🧱", ages: "6-8 yosh", price: "250,000" },
  { id: 'robot', name: "Robototexnika", emoji: "🤖", ages: "8-15 yosh", price: "400-600K" },
  { id: 'programming', name: "Dasturlash", emoji: "💻", ages: "10-18 yosh", price: "400-500K" },
  { id: 'ai', name: "Sun'iy Intellekt", emoji: "🧠", ages: "16+ yosh", price: "800K-1.2M" },
  { id: '3d', name: "3D Modellashtirish", emoji: "🎨", ages: "10-18 yosh", price: "400-750K" }
];

const AGES = ["6-8 yosh", "8-15 yosh", "16+ yosh"];

// ============================================
// 🤖 AI JAVOB GENERATORI
// ============================================

const generateAIResponse = (userMessage) => {
  const msg = userMessage.toLowerCase().trim();
  
  if (/^(salom|assalom|hello|hi|hey)/.test(msg)) {
    return {
      text: `Assalomu alaykum! 👋\n\nMen Roboschool AI yordamchisiman!\n\n🏫 Roboschool — ${CONFIG.foundedYear}-yilda ${CONFIG.founder} tomonidan asos solingan.\n🎓 ${CONFIG.graduates} nafar bitiruvchi!\n\n🎯 Yosh toifalari:\n👶 6–8 yosh — LEGO robotlar\n🧒 8–15 yosh — sensorli robotlar\n👨‍💻 16+ yosh — AI, dasturlash\n\nQanday savol bilan keldingiz?`,
      suggestions: ["📚 Kurslar", "🏆 Yutuqlarimiz", "🧠 AI kursi", "📝 Ro'yxatdan o'tish"]
    };
  }

  if (msg.includes('ai') || msg.includes("sun'iy") || msg.includes('intellekt')) {
    return {
      text: `🧠 SUN'IY INTELLEKT KURSI\n\n👨‍💻 16+ yosh uchun!\n\n📊 Data Science — ma'lumotlar tahlili\n👁 Computer Vision — yuzni aniqlash, obyekt tanish\n🗣 NLP — nutq bilan ishlash\n🤖 Machine Learning\n\n⏱ Davomiyligi: 6-12 oy\n💰 Narx: 800,000 - 1,200,000 so'm/oy`,
      suggestions: ["📝 Ro'yxatdan o'tish", "💰 Narxlar", "📞 Bog'lanish"]
    };
  }

  if (msg.includes('kurs') || msg.includes("yo'nalish")) {
    return {
      text: `📚 BIZNING KURSLAR\n\n🧱 Lego WeDo (6-8 yosh) — 250K\n🤖 Robototexnika (8-15 yosh) — 400-600K\n💻 Dasturlash (10-18 yosh) — 400-500K\n🧠 Sun'iy Intellekt (16+) — 800K-1.2M\n🎨 3D Modellashtirish — 400-750K\n\n✅ Arduino noldan\n✅ Python professional\n✅ Computer Vision, NLP`,
      suggestions: ["🧱 Lego", "🤖 Robot", "💻 Dasturlash", "🧠 AI", "📝 Ro'yxatdan o'tish"]
    };
  }

  if (msg.includes('yutuq') || msg.includes('musobaqa')) {
    return {
      text: `🏆 YUTUQLARIMIZ\n\n🥇 CYBERUNI PARK CUP 2025 — 1-o'rin + 5 mln so'm\n🥈 ROBBO-FEST 2024 — 2-o'rin\n🥉 Kelajak muhandislari — 3-o'rin\n🥇 Raqamli avlod IT haftaligi — 1-o'rin\n\n🎓 ${CONFIG.graduates} nafar bitiruvchi!`,
      suggestions: ["📚 Kurslar", "📝 Ro'yxatdan o'tish", "📞 Bog'lanish"]
    };
  }

  if (msg.includes('narx') || msg.includes('qancha') || msg.includes("to'lov")) {
    return {
      text: `💰 NARXLARIMIZ\n\n🧱 Lego WeDo: 250,000 so'm/oy\n🤖 Robototexnika: 400,000 - 600,000 so'm/oy\n💻 Dasturlash: 400,000 - 500,000 so'm/oy\n🧠 Sun'iy Intellekt: 800,000 - 1,200,000 so'm/oy\n🎨 3D Modellashtirish: 400,000 - 750,000 so'm/oy\n\n🎁 Birinchi sinov darsi BEPUL!\n👨‍👩‍👧‍👦 Aka-uka chegirma: 15%`,
      suggestions: ["📝 Ro'yxatdan o'tish", "🎁 Sinov darsi", "📞 Bog'lanish"]
    };
  }

  if (msg.includes('manzil') || msg.includes('qayer')) {
    return {
      text: `📍 MANZILIMIZ\n\n🏢 ${CONFIG.address.region}, ${CONFIG.address.district}\n🗺 ${CONFIG.address.city}, ${CONFIG.address.street}\n📌 ${CONFIG.address.mfy}, ${CONFIG.address.floor}\n\n🧭 Mo'ljal: ${CONFIG.address.landmark}\n\n📞 ${CONFIG.phone}\n📱 ${CONFIG.telegram}\n\n🕐 ${CONFIG.workHours}`,
      suggestions: ["📝 Ro'yxatdan o'tish", "📞 Qo'ng'iroq", "🎁 Sinov darsi"]
    };
  }

  if (msg.includes('aloqa') || msg.includes('telefon') || msg.includes("bog'lan")) {
    return {
      text: `📞 BOG'LANISH\n\n📱 Telefon: ${CONFIG.phone}\n📲 Telegram: ${CONFIG.telegram}\n📸 Instagram: ${CONFIG.instagram}\n\n🕐 ${CONFIG.workHours}`,
      suggestions: ["📍 Manzil", "📝 Ro'yxatdan o'tish", "📚 Kurslar"]
    };
  }

  if (msg.includes('rahmat') || msg.includes('tashakkur')) {
    return {
      text: `Arzimaydi! 😊 Yana savollaringiz bo'lsa yozing!\n\nRoboschool — kelajak bugundan boshlanadi! 🚀`,
      suggestions: ["📚 Kurslar", "📍 Manzil", "📞 Bog'lanish"]
    };
  }

  return {
    text: `Men sizga yordam bera olaman:\n\n📚 Kurslar haqida\n💰 Narxlar\n📝 Ro'yxatdan o'tish\n🏆 Yutuqlarimiz\n📍 Manzil\n📞 Aloqa\n\nNimani bilmoqchisiz?`,
    suggestions: ["📚 Kurslar", "🏆 Yutuqlarimiz", "📝 Ro'yxatdan o'tish", "📍 Manzil"]
  };
};

// ============================================
// 🎨 ANIMATED LOGO
// ============================================

const AnimatedLogo = () => (
  <div style={{ width: '52px', height: '52px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', inset: '-50%', background: 'conic-gradient(from 0deg, #00d4ff, #7b2ff7, #ff0080, #ff6b35, #00ff88, #00d4ff)', animation: 'spin 3s linear infinite' }} />
    <div style={{ position: 'absolute', inset: '3px', borderRadius: '13px', background: 'linear-gradient(135deg, #0a0a1a, #1a1a3e)' }} />
    <span style={{ fontSize: '26px', zIndex: 1 }}>🤖</span>
  </div>
);

// ============================================
// 🎨 STREAMING TEXT
// ============================================

const StreamingText = ({ text, onComplete, onType }) => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => { setDisplayed(''); setIndex(0); }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const char = text[index];
      let delay = 10 + Math.random() * 10;
      if (['.', '!', '?', '\n'].includes(char)) delay += 80;
      if (char === ',') delay += 30;
      
      const timeout = setTimeout(() => {
        setDisplayed(prev => prev + text[index]);
        setIndex(prev => prev + 1);
        // Har 3 ta harfda scroll qilish
        if (index % 3 === 0) onType?.();
      }, delay);
      return () => clearTimeout(timeout);
    } else if (text.length > 0) {
      onComplete?.();
    }
  }, [index, text, onComplete, onType]);

  return (
    <span>
      {displayed}
      {index < text.length && (
        <span style={{ display: 'inline-block', width: '2px', height: '16px', background: '#00d4ff', marginLeft: '2px', animation: 'blink 0.6s infinite', verticalAlign: 'text-bottom' }} />
      )}
    </span>
  );
};

// ============================================
// 📝 MODAL RO'YXATDAN O'TISH FORMASI
// ============================================

const RegistrationModal = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', age: '', course: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, step]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleNext = () => {
    if (step === 1 && formData.name.trim().length >= 2) {
      setStep(2);
    } else if (step === 2 && formData.phone.replace(/\D/g, '').length >= 9) {
      setStep(3);
    } else if (step === 3 && formData.age) {
      setStep(4);
    } else if (step === 4 && formData.course) {
      setIsSubmitting(true);
      sendToTelegram(formData);
      setTimeout(() => {
        onSubmit(formData);
        setIsSubmitting(false);
        setStep(1);
        setFormData({ name: '', phone: '', age: '', course: '' });
      }, 1000);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed', 
        inset: 0, 
        background: 'rgba(0,0,0,0.9)', 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'center',
        zIndex: 9999, 
        padding: '16px', 
        paddingTop: '5vh', 
        overflowY: 'auto'
      }} 
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: 'linear-gradient(180deg, #1e1e4a, #12122e)', 
        borderRadius: '24px',
        width: '100%', 
        maxWidth: '380px', 
        padding: '20px', 
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>📝</div>
          <h2 style={{ color: '#fff', fontSize: '18px', margin: 0, fontWeight: '700' }}>Ro'yxatdan o'tish</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>Qadam {step} / 4</p>
          
          {/* Progress bar */}
          <div style={{ display: 'flex', gap: '6px', marginTop: '12px', justifyContent: 'center' }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{
                width: '40px', 
                height: '4px', 
                borderRadius: '2px',
                background: i <= step ? 'linear-gradient(90deg, #00d4ff, #7b2ff7)' : 'rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease'
              }} />
            ))}
          </div>
        </div>

        {/* Step 1: Ism */}
        {step === 1 && (
          <div>
            <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '10px', display: 'block', fontWeight: '500' }}>
              👤 Ism-familiyangiz
            </label>
            <input
              ref={inputRef}
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Masalan: Rasul Israilov"
              autoComplete="name"
              style={{
                width: '100%', 
                padding: '14px 16px', 
                borderRadius: '12px',
                border: '2px solid rgba(0,212,255,0.4)', 
                background: 'rgba(255,255,255,0.1)',
                color: '#fff', 
                fontSize: '16px', 
                outline: 'none', 
                boxSizing: 'border-box'
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleNext()}
            />
          </div>
        )}

        {/* Step 2: Telefon */}
        {step === 2 && (
          <div>
            <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '10px', display: 'block', fontWeight: '500' }}>
              📞 Telefon raqamingiz
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{
                padding: '14px 12px', 
                borderRadius: '12px', 
                background: 'rgba(0,212,255,0.15)',
                border: '2px solid rgba(0,212,255,0.4)', 
                color: '#00d4ff', 
                fontSize: '16px', 
                fontWeight: '600'
              }}>+998</div>
              <input
                ref={inputRef}
                type="tel"
                inputMode="numeric"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 9)})}
                placeholder="901234567"
                autoComplete="tel"
                style={{
                  flex: 1, 
                  padding: '14px 16px', 
                  borderRadius: '12px',
                  border: '2px solid rgba(0,212,255,0.4)', 
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff', 
                  fontSize: '16px', 
                  outline: 'none', 
                  boxSizing: 'border-box'
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleNext()}
              />
            </div>
          </div>
        )}

        {/* Step 3: Yosh */}
        {step === 3 && (
          <div>
            <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '12px', display: 'block', fontWeight: '500' }}>
              🎂 Yoshingizni tanlang
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {AGES.map(age => (
                <button
                  key={age}
                  onClick={() => { setFormData({...formData, age}); setTimeout(() => setStep(4), 200); }}
                  style={{
                    padding: '16px', 
                    borderRadius: '12px', 
                    border: formData.age === age ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    background: formData.age === age ? 'linear-gradient(135deg, #00d4ff, #7b2ff7)' : 'rgba(255,255,255,0.08)',
                    color: '#fff', 
                    fontSize: '16px', 
                    cursor: 'pointer', 
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >{age}</button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Kurs */}
        {step === 4 && (
          <div>
            <label style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', marginBottom: '12px', display: 'block', fontWeight: '500' }}>
              📚 Qaysi kursni tanlaysiz?
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {COURSES.map(course => (
                <button
                  key={course.id}
                  onClick={() => setFormData({...formData, course: course.name})}
                  style={{
                    padding: '14px 16px', 
                    borderRadius: '12px', 
                    border: formData.course === course.name ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    background: formData.course === course.name ? 'linear-gradient(135deg, #00d4ff, #7b2ff7)' : 'rgba(255,255,255,0.08)',
                    color: '#fff', 
                    fontSize: '14px', 
                    cursor: 'pointer', 
                    textAlign: 'left',
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontWeight: '500' }}>{course.emoji} {course.name}</span>
                  <span style={{ fontSize: '11px', opacity: 0.6 }}>{course.ages}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={handleBack}
            style={{
              flex: 1, 
              padding: '14px', 
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)', 
              background: 'transparent',
              color: '#fff', 
              fontSize: '14px', 
              cursor: 'pointer', 
              fontWeight: '500'
            }}
          >{step === 1 ? '✕ Bekor' : '← Orqaga'}</button>
          <button
            onClick={handleNext}
            disabled={isSubmitting || (step === 1 && formData.name.length < 2) || (step === 2 && formData.phone.length < 9) || (step === 3 && !formData.age) || (step === 4 && !formData.course)}
            style={{
              flex: 2, 
              padding: '14px', 
              borderRadius: '12px', 
              border: 'none',
              background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
              color: '#fff', 
              fontSize: '14px', 
              fontWeight: '600', 
              cursor: 'pointer',
              opacity: (step === 1 && formData.name.length < 2) || (step === 2 && formData.phone.length < 9) || (step === 3 && !formData.age) || (step === 4 && !formData.course) ? 0.5 : 1,
              transition: 'opacity 0.2s ease'
            }}
          >{isSubmitting ? '⏳ Yuborilmoqda...' : step === 4 ? '✅ Yuborish' : 'Davom etish →'}</button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 🎉 SUCCESS MODAL
// ============================================

const SuccessModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      style={{
        position: 'fixed', 
        inset: 0, 
        background: 'rgba(0,0,0,0.9)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 9999, 
        padding: '20px'
      }} 
      onClick={onClose}
    >
      <div 
        style={{
          background: 'linear-gradient(180deg, #1e1e4a, #12122e)', 
          borderRadius: '24px',
          width: '100%', 
          maxWidth: '380px', 
          padding: '28px', 
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
        }} 
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: '56px', marginBottom: '12px' }}>🎉</div>
        <h2 style={{ color: '#00ff88', fontSize: '20px', margin: '0 0 8px 0', fontWeight: '700' }}>Tabriklaymiz!</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>
          Ro'yxatdan muvaffaqiyatli o'tdingiz!
        </p>
        
        <div style={{
          background: 'rgba(0,0,0,0.3)', 
          borderRadius: '12px', 
          padding: '16px',
          textAlign: 'left', 
          marginBottom: '20px'
        }}>
          <div style={{ color: '#fff', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>👤</span> <span>{data?.name}</span>
          </div>
          <div style={{ color: '#fff', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📞</span> <span>+998 {data?.phone}</span>
          </div>
          <div style={{ color: '#fff', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎂</span> <span>{data?.age}</span>
          </div>
          <div style={{ color: '#fff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📚</span> <span>{data?.course}</span>
          </div>
        </div>
        
        <p style={{ color: '#00d4ff', fontSize: '13px', marginBottom: '20px' }}>
          📞 Tez orada siz bilan bog'lanamiz!
        </p>
        
        <button
          onClick={onClose}
          style={{
            width: '100%', 
            padding: '14px', 
            borderRadius: '12px', 
            border: 'none',
            background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
            color: '#fff', 
            fontSize: '15px', 
            fontWeight: '600', 
            cursor: 'pointer'
          }}
        >Yopish</button>
      </div>
    </div>
  );
};

// ============================================
// 🚀 ASOSIY COMPONENT
// ============================================

export default function RoboschoolAIChatBot() {
  const [messages, setMessages] = useState([
    {
      id: 1, 
      type: 'bot',
      text: `Assalomu alaykum! 👋\n\nMen Roboschool AI yordamchisiman!\n\n🏫 Roboschool — ${CONFIG.foundedYear}-yilda ${CONFIG.founder} tomonidan asos solingan.\n🎓 ${CONFIG.graduates} nafar bitiruvchi!\n\nQanday savol bilan keldingiz?`,
      suggestions: ["📚 Kurslar", "🏆 Yutuqlarimiz", "🧠 AI kursi", "📝 Ro'yxatdan o'tish"],
      timestamp: new Date(), 
      streamComplete: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState('');
  const [showRegModal, setShowRegModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  }, []);

  useEffect(() => { 
    scrollToBottom(); 
  }, [messages, isTyping, scrollToBottom]);

  const handleStreamComplete = (messageId) => {
    setMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, streamComplete: true } : msg));
    setIsStreaming(false);
  };

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim() || isStreaming) return;

    if (text.includes("Ro'yxatdan") || text.includes("ro'yxatdan")) {
      setShowRegModal(true);
      return;
    }

    const userMessage = { 
      id: Date.now(), 
      type: 'user', 
      text: text.trim(), 
      timestamp: new Date(), 
      streamComplete: true 
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setThinkingMessage(getRandomThinkingMessage());

    const response = generateAIResponse(text);
    const delay = getThinkingDelay(text.length, false);

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1, 
        type: 'bot',
        text: response.text, 
        suggestions: response.suggestions,
        timestamp: new Date(), 
        streamComplete: false
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      setIsStreaming(true);
    }, delay);
  };

  const handleRegistrationSubmit = (data) => {
    setShowRegModal(false);
    setRegisteredData(data);
    setShowSuccessModal(true);
  };

  const openLink = (type) => {
    const links = {
      telegram: `https://t.me/${CONFIG.telegram.replace('@', '')}`,
      instagram: `https://instagram.com/${CONFIG.instagram.replace('@', '')}`,
      phone: `tel:${CONFIG.phone.replace(/\s/g, '')}`,
      channel: CONFIG.telegramChannel
    };
    window.open(links[type], '_blank');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0d0d1f 100%)', 
      fontFamily: "'Inter', -apple-system, sans-serif", 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '12px',
      boxSizing: 'border-box'
    }}>
      
      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={showRegModal} 
        onClose={() => setShowRegModal(false)}
        onSubmit={handleRegistrationSubmit}
      />
      
      {/* Success Modal */}
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}
        data={registeredData}
      />

      {/* Header */}
      <div style={{ width: '100%', maxWidth: '500px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AnimatedLogo />
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '22px', 
                fontWeight: '800', 
                background: 'linear-gradient(90deg, #00d4ff, #7b2ff7, #ff0080)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>ROBOSCHOOL</h1>
              <p style={{ margin: 0, fontSize: '10px', color: '#00d4ff', letterSpacing: '2px' }}>✨ AI YORDAMCHI</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => openLink('telegram')} style={{ width: '34px', height: '34px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #0088cc, #00aaff)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📱</button>
            <button onClick={() => openLink('instagram')} style={{ width: '34px', height: '34px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #f09433, #dc2743)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📸</button>
            <button onClick={() => openLink('phone')} style={{ width: '34px', height: '34px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #00c853, #00e676)', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📞</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ padding: '4px 10px', background: 'rgba(0,212,255,0.1)', borderRadius: '12px', color: '#00d4ff', fontSize: '10px' }}>📞 {CONFIG.phone}</span>
          <span style={{ padding: '4px 10px', background: 'rgba(123,47,247,0.1)', borderRadius: '12px', color: '#a855f7', fontSize: '10px' }}>📍 Chinoz</span>
          <span style={{ padding: '4px 10px', background: 'rgba(0,255,136,0.1)', borderRadius: '12px', color: '#00ff88', fontSize: '10px' }}>🎓 {CONFIG.graduates}</span>
        </div>
      </div>

      {/* Chat Container */}
      <div style={{ 
        width: '100%', 
        maxWidth: '500px', 
        flex: 1,
        minHeight: '400px',
        maxHeight: 'calc(100vh - 180px)',
        background: 'linear-gradient(180deg, rgba(15,15,35,0.95), rgba(10,10,25,0.98))', 
        borderRadius: '20px', 
        overflow: 'hidden', 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
      }}>
        
        {/* Chat Header */}
        <div style={{ 
          padding: '12px 16px', 
          background: 'linear-gradient(90deg, rgba(0,212,255,0.15), rgba(123,47,247,0.15))', 
          borderBottom: '1px solid rgba(255,255,255,0.08)', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          flexShrink: 0 
        }}>
          <div style={{ 
            width: '38px', 
            height: '38px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '18px' 
          }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>Roboschool AI</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', background: '#00ff88', borderRadius: '50%' }}/>
              {isTyping ? thinkingMessage : 'Online'}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg) => (
            <div key={msg.id}>
              <div style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '6px' }}>
                {msg.type === 'bot' && (
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '12px', 
                    flexShrink: 0 
                  }}>🤖</div>
                )}
                <div style={{ 
                  maxWidth: '80%', 
                  padding: '10px 14px', 
                  borderRadius: msg.type === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', 
                  background: msg.type === 'user' ? 'linear-gradient(135deg, #7b2ff7, #5b1fd7)' : 'rgba(255,255,255,0.05)', 
                  color: '#fff', 
                  fontSize: '13px', 
                  lineHeight: '1.5', 
                  whiteSpace: 'pre-line',
                  border: msg.type === 'bot' ? '1px solid rgba(255,255,255,0.08)' : 'none'
                }}>
                  {msg.type === 'bot' && !msg.streamComplete ? (
                    <StreamingText text={msg.text} onComplete={() => handleStreamComplete(msg.id)} onType={scrollToBottom} />
                  ) : msg.text}
                </div>
              </div>
              {msg.type === 'bot' && msg.suggestions && msg.streamComplete && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px', paddingLeft: '30px' }}>
                  {msg.suggestions.map((sug, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleSendMessage(sug)} 
                      disabled={isStreaming || isTyping} 
                      style={{ 
                        padding: '6px 12px', 
                        border: '1px solid rgba(0,212,255,0.4)', 
                        borderRadius: '14px', 
                        background: 'rgba(0,212,255,0.1)', 
                        color: '#00d4ff', 
                        fontSize: '11px', 
                        cursor: 'pointer' 
                      }}
                    >{sug}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #00d4ff, #7b2ff7)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '12px' 
              }}>🤖</div>
              <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                <span style={{ color: '#888', fontSize: '12px' }}>{thinkingMessage}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ 
          padding: '10px 12px', 
          background: 'rgba(15,15,35,0.98)', 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          display: 'flex', 
          gap: '8px', 
          flexShrink: 0 
        }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Xabar yozing..."
            disabled={isStreaming || isTyping}
            style={{
              flex: 1, 
              padding: '12px 16px', 
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.15)', 
              background: 'rgba(255,255,255,0.08)',
              color: '#ffffff', 
              fontSize: '15px', 
              outline: 'none'
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isStreaming || isTyping || !inputValue.trim()}
            style={{
              width: '44px', 
              height: '44px', 
              borderRadius: '50%', 
              border: 'none',
              background: !inputValue.trim() ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #00d4ff, #7b2ff7)',
              color: '#fff', 
              fontSize: '16px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >➤</button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ width: '100%', maxWidth: '500px', marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <button onClick={() => openLink('telegram')} style={{ padding: '8px 14px', background: 'rgba(0,136,204,0.15)', border: '1px solid rgba(0,136,204,0.3)', borderRadius: '10px', color: '#00aaff', fontSize: '11px', cursor: 'pointer' }}>📱 Telegram</button>
        <button onClick={() => openLink('instagram')} style={{ padding: '8px 14px', background: 'rgba(225,48,108,0.15)', border: '1px solid rgba(225,48,108,0.3)', borderRadius: '10px', color: '#e1306c', fontSize: '11px', cursor: 'pointer' }}>📸 Instagram</button>
        <button onClick={() => openLink('channel')} style={{ padding: '8px 14px', background: 'rgba(0,255,136,0.15)', border: '1px solid rgba(0,255,136,0.3)', borderRadius: '10px', color: '#00ff88', fontSize: '11px', cursor: 'pointer' }}>📢 Kanal</button>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 2px; }
        input::placeholder { color: rgba(255,255,255,0.4) !important; }
        input { color: #fff !important; -webkit-text-fill-color: #fff !important; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}