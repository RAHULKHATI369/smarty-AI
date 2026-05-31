import React, { useState } from 'react';
import { ImagePlus, Sparkles, Home, Compass, Shield, Sun, Layers, Tag, Star, CheckCircle, Upload } from 'lucide-react';

const EXTRACTED_FEATURES = [
  { label: 'Orientation', value: 'East-facing', icon: Compass, color: 'cyan' },
  { label: 'Security', value: '3-tier gated', icon: Shield, color: 'emerald' },
  { label: 'Natural Light', value: 'Excellent', icon: Sun, color: 'amber' },
  { label: 'Floor', value: '12th / 24', icon: Layers, color: 'violet' },
  { label: 'Condition', value: 'Move-in Ready', icon: CheckCircle, color: 'emerald' },
  { label: 'Category', value: '3BHK Premium', icon: Tag, color: 'rose' },
];

const SAMPLE_LISTING = {
  title: 'Premium 3BHK in Sector 128, Noida',
  titleHi: 'सेक्टर 128, नोएडा में प्रीमियम 3BHK',
  price: '₹1.85 Cr',
  area: '1,850 sq.ft.',
  desc: 'Spacious east-facing 3BHK with premium Italian marble flooring, modular kitchen with chimney, and panoramic Yamuna Expressway views. 3-tier gated community with 24/7 power backup, swimming pool, and clubhouse access.',
  descHi: 'विशाल पूर्वमुखी 3BHK, प्रीमियम इटालियन मार्बल फ्लोरिंग, मॉड्यूलर किचन चिमनी के साथ, और यमुना एक्सप्रेसवे का मनोरम दृश्य।',
  tags: ['East-facing', 'Gated Community', 'Swimming Pool', 'Near Metro', 'Power Backup', 'Parking'],
};

export default function ListingAssistant() {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showListing, setShowListing] = useState(false);
  const [lang, setLang] = useState('en');

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).slice(0, 4).map(f => ({
      url: URL.createObjectURL(f),
      name: f.name,
    }));
    setUploadedImages(prev => [...prev, ...newImages].slice(0, 4));
  };

  const generateListing = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowListing(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" /> AI Listing Generator
        </h3>
        <p className="text-xs text-slate-500 mt-1">Upload property images → AI extracts features → Premium listing generated</p>
      </div>

      {/* Upload Zone */}
      <div
        onDrop={e => { e.preventDefault(); handleImageUpload(e.dataTransfer.files); }}
        onDragOver={e => e.preventDefault()}
        onClick={() => document.getElementById('listing-file-input')?.click()}
        className="border-2 border-dashed border-amber-500/30 hover:border-amber-400/60 bg-amber-500/5 hover:bg-amber-500/10 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 group"
      >
        <input id="listing-file-input" type="file" accept="image/*" multiple className="hidden"
          onChange={e => handleImageUpload(e.target.files)} />
        <ImagePlus className="w-12 h-12 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
        <p className="text-amber-300 font-bold text-lg">Drop property images here</p>
        <p className="text-slate-400 text-sm mt-1">Up to 4 images • JPG, PNG, WebP</p>
      </div>

      {/* Image Previews */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {uploadedImages.map((img, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden border border-slate-700 group">
              <img src={img.url} alt={img.name} className="w-full h-28 object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={(e) => { e.stopPropagation(); setUploadedImages(prev => prev.filter((_, j) => j !== i)); }}
                  className="text-white text-xs bg-red-500/80 px-2 py-1 rounded-lg font-bold">Remove</button>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/60 px-1.5 py-0.5 rounded text-[9px] text-slate-300">{i + 1}/4</div>
            </div>
          ))}
        </div>
      )}

      {/* Generate Button */}
      {uploadedImages.length > 0 && !showListing && (
        <button onClick={generateListing} disabled={isProcessing}
          className="w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20">
          {isProcessing ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Extracting Features...</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Generate Premium Listing</>
          )}
        </button>
      )}

      {/* AI Extracted Features */}
      {showListing && (
        <div className="space-y-5 animate-fade-in-scale">
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Vision-Extracted Features
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {EXTRACTED_FEATURES.map((f, i) => (
                <div key={i} className={`bg-${f.color}-500/10 border border-${f.color}-500/20 rounded-xl p-3 flex items-center gap-3`}>
                  <f.icon className={`w-4 h-4 text-${f.color}-400 shrink-0`} />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold">{f.label}</div>
                    <div className="text-sm font-bold text-white">{f.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex gap-2">
            <button onClick={() => setLang('en')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${lang === 'en' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 border border-slate-700'}`}>English</button>
            <button onClick={() => setLang('hi')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${lang === 'hi' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-500 border border-slate-700'}`}>हिंदी</button>
          </div>

          {/* Generated Listing Card */}
          <div className="glass-panel-heavy p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-black text-white">{lang === 'en' ? SAMPLE_LISTING.title : SAMPLE_LISTING.titleHi}</h4>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-2xl font-black gradient-text-amber">{SAMPLE_LISTING.price}</span>
                  <span className="text-xs text-slate-500">• {SAMPLE_LISTING.area}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-amber-400">Premium</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{lang === 'en' ? SAMPLE_LISTING.desc : SAMPLE_LISTING.descHi}</p>

            <div className="flex flex-wrap gap-2">
              {SAMPLE_LISTING.tags.map((tag, i) => (
                <span key={i} className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg text-[10px] text-slate-400 font-bold uppercase tracking-wider">{tag}</span>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                <Upload className="w-3 h-3" /> Publish Listing
              </button>
              <button className="py-2.5 px-4 rounded-xl border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">Edit</button>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {uploadedImages.length === 0 && (
        <div className="glass-panel p-6 text-center">
          <Home className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Upload property photos to auto-generate a premium listing</p>
          <p className="text-xs text-slate-600 mt-1">Supports English & Hindi • AI vision pipeline</p>
        </div>
      )}
    </div>
  );
}
