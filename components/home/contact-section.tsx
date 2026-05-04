"use client"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Mail, LayoutGrid, MessageSquare, Phone, MapPin, ChevronDown, Check, Send } from "lucide-react"

import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Text } from "@/components/ui/text"
import { SectionLabel } from "@/components/ui/section-label"
import { COMPANY_NAME, CONTACT_EMAIL, CONTACT_PHONE, ADDRESS } from "@/constants"
import { useReducedMotion } from "@/utils/use-reduced-motion"

// --- Custom Interactive Form Components ---

const SERVICE_OPTIONS = [
  { label: "Full Publishing Package", value: "publishing" },
  { label: "Editing & Proofreading", value: "editing" },
  { label: "Cover Design & Formatting", value: "design" },
  { label: "Book Marketing", value: "marketing" }
];

function CustomInput({ icon: Icon, placeholder, type = "text" }: { icon: any, placeholder: string, type?: string }) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <div className="relative group w-full">
      {/* Focus Glow Background */}
      <div className={`absolute inset-0 bg-secondary-400 blur-xl transition-opacity duration-500 rounded-[2rem] ${isFocused ? "opacity-15" : "opacity-0 group-hover:opacity-5"}`} />
      
      <div className={`relative bg-white border rounded-[2rem] transition-all duration-500 flex items-center overflow-hidden
        ${isFocused ? "border-secondary-400 shadow-xl shadow-secondary-500/10" : "border-white shadow-sm hover:border-primary-200"}
      `}>
        <div className="pl-6 pr-4 flex items-center justify-center">
          <Icon className={`w-5 h-5 transition-all duration-500 ${isFocused ? "text-secondary-500 scale-110" : "text-primary-400 group-hover:text-primary-600"}`} />
        </div>
        <input 
          type={type}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent py-5 pr-6 text-primary-950 placeholder-primary-400 focus:outline-none font-body text-base"
        />
        {/* Animated bottom accent indicator */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-secondary-500 transition-all duration-500 ease-out rounded-t-full ${isFocused ? "w-[60%] opacity-100" : "w-0 opacity-0"}`} />
      </div>
    </div>
  )
}

function CustomSelect({ icon: Icon, options, placeholder }: { icon: any, options: {label: string, value: string}[], placeholder: string }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);
  const selectRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative group w-full z-20" ref={selectRef}>
      {/* Focus Glow Background */}
      <div className={`absolute inset-0 bg-secondary-400 blur-xl transition-opacity duration-500 rounded-[2rem] ${isOpen ? "opacity-15" : "opacity-0 group-hover:opacity-5"}`} />
      
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative bg-white border rounded-[2rem] transition-all duration-500 flex items-center cursor-pointer overflow-hidden
          ${isOpen ? "border-secondary-400 shadow-xl shadow-secondary-500/10" : "border-white shadow-sm hover:border-primary-200"}
        `}
      >
        <div className="pl-6 pr-4 flex items-center justify-center">
          <Icon className={`w-5 h-5 transition-all duration-500 ${isOpen ? "text-secondary-500 scale-110" : "text-primary-400 group-hover:text-primary-600"}`} />
        </div>
        <div className={`w-full py-5 pr-6 text-base font-body transition-colors select-none ${selected ? "text-primary-950" : "text-primary-400"}`}>
          {selected ? options.find(o => o.value === selected)?.label : placeholder}
        </div>
        <div className="pr-6">
          <ChevronDown className={`w-5 h-5 text-primary-400 transition-transform duration-500 ${isOpen ? "rotate-180 text-secondary-500" : ""}`} />
        </div>
        {/* Animated bottom accent indicator */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-secondary-500 transition-all duration-500 ease-out rounded-t-full ${isOpen ? "w-[60%] opacity-100" : "w-0 opacity-0"}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+12px)] bg-white border border-primary-100 shadow-2xl rounded-3xl overflow-hidden flex flex-col py-2"
          >
            {options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-6 py-4 transition-colors font-body flex items-center justify-between group/btn
                  ${selected === option.value ? "bg-primary-50 text-secondary-600 font-medium" : "hover:bg-primary-50 text-primary-950"}
                `}
              >
                <span className="group-hover/btn:translate-x-2 transition-transform duration-300">{option.label}</span>
                {selected === option.value && <Check className="w-5 h-5 text-secondary-500" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CustomTextarea({ icon: Icon, placeholder }: { icon: any, placeholder: string }) {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <div className="relative group w-full z-10">
      {/* Focus Glow Background */}
      <div className={`absolute inset-0 bg-secondary-400 blur-xl transition-opacity duration-500 rounded-[2rem] ${isFocused ? "opacity-15" : "opacity-0 group-hover:opacity-5"}`} />
      
      <div className={`relative bg-white border rounded-[2rem] transition-all duration-500 flex items-start overflow-hidden
        ${isFocused ? "border-secondary-400 shadow-xl shadow-secondary-500/10" : "border-white shadow-sm hover:border-primary-200"}
      `}>
        <div className="pl-6 pr-4 pt-[1.35rem] flex items-center justify-center">
          <Icon className={`w-5 h-5 transition-all duration-500 ${isFocused ? "text-secondary-500 scale-110" : "text-primary-400 group-hover:text-primary-600"}`} />
        </div>
        <textarea 
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={5}
          className="w-full bg-transparent py-5 pr-6 text-primary-950 placeholder-primary-400 focus:outline-none font-body text-base resize-none"
        />
        {/* Animated bottom accent indicator */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-secondary-500 transition-all duration-500 ease-out rounded-t-full ${isFocused ? "w-[60%] opacity-100" : "w-0 opacity-0"}`} />
      </div>
    </div>
  )
}

interface ContactSectionProps {
  contactInfo?: any
}

export function ContactSection({ contactInfo }: ContactSectionProps) {
  const shouldReduceMotion = useReducedMotion()

  const email = contactInfo?.contactEmail || CONTACT_EMAIL;
  const phone = contactInfo?.contactPhone || CONTACT_PHONE;
  const address = contactInfo?.address || ADDRESS;

  return (
    <Section spacing="lg" className="bg-primary-50 border-t border-primary-900/5 overflow-hidden relative">
      <Container>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">
          
          {/* Left Side: Dark Info Card */}
          <div className="w-full lg:w-5/12">
            <div className="bg-primary-950 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden h-full flex flex-col justify-between shadow-2xl shadow-primary-900/10">
              {/* Internal Glows */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-500/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary-500/20 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10">
                 <SectionLabel className="mb-6 border-white/20 text-white/70">Get In Touch</SectionLabel>
                 <Heading as="h2" size="h2" className="text-white mb-6 leading-tight">
                   Let's Make Something <span className="text-secondary-400 block">Great.</span>
                 </Heading>
                 <Text className="text-primary-200/80 mb-16 max-w-sm leading-relaxed text-lg font-light">
                   We're ready to hear your story. Reach out directly or fill out the form, and our publishing experts will contact you promptly.
                 </Text>

                 <div className="flex flex-col gap-10">
                   {/* Phone */}
                   <div className="flex items-center gap-6 group">
                     <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-secondary-500/20 group-hover:border-secondary-500/30 transition-all duration-500 shrink-0">
                       <Phone className="w-6 h-6 text-secondary-400 group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <div>
                       <span className="block text-xs font-mono tracking-widest text-primary-300/60 mb-2 uppercase">Direct Line</span>
                       <span className="text-xl md:text-2xl font-heading font-medium tracking-wide">{phone}</span>
                     </div>
                   </div>

                   {/* Email */}
                   <div className="flex items-center gap-6 group">
                     <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-secondary-500/20 group-hover:border-secondary-500/30 transition-all duration-500 shrink-0">
                       <Mail className="w-6 h-6 text-secondary-400 group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <div>
                       <span className="block text-xs font-mono tracking-widest text-primary-300/60 mb-2 uppercase">Email Support</span>
                       <a href={`mailto:${email}`} className="text-xl md:text-2xl font-heading font-medium tracking-wide hover:text-secondary-400 transition-colors">{email}</a>
                     </div>
                   </div>

                   {/* Location */}
                   <div className="flex items-center gap-6 group">
                     <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-secondary-500/20 group-hover:border-secondary-500/30 transition-all duration-500 shrink-0">
                       <MapPin className="w-6 h-6 text-secondary-400 group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <div>
                       <span className="block text-xs font-mono tracking-widest text-primary-300/60 mb-2 uppercase">Headquarters</span>
                       <span className="text-lg md:text-xl font-heading font-medium tracking-wide max-w-[200px] block">{address}</span>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Side: Floating Glass Inputs Form */}
          <div className="w-full lg:w-7/12 py-4 lg:py-8 flex flex-col justify-center">
            <motion.div 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
               <div className="mb-10">
                  <h3 className="text-3xl lg:text-4xl font-heading font-bold text-primary-950 mb-4">Send an Inquiry</h3>
                  <p className="text-primary-700 text-lg">Fill out the fields below and we'll get back to you within 24 hours.</p>
               </div>
               
               <form className="flex flex-col gap-5 lg:gap-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                     <CustomInput icon={User} placeholder="Full Name" />
                     <CustomInput icon={Mail} placeholder="Email Address" type="email" />
                  </div>
                  
                  <CustomSelect 
                     icon={LayoutGrid} 
                     placeholder="Service of Interest" 
                     options={SERVICE_OPTIONS} 
                  />
                  
                  <CustomTextarea 
                     icon={MessageSquare} 
                     placeholder="Tell us about your manuscript or project..." 
                  />
                  
                  <div className="mt-4 flex justify-end">
                    <button type="submit" className="relative group overflow-hidden rounded-[2rem] bg-primary-950 w-full md:w-auto px-10 py-5 flex items-center justify-center gap-4 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary-900/10">
                       {/* Button Hover Glow */}
                       <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                       
                       <span className="relative z-10 font-heading font-semibold text-white text-lg tracking-wide">
                         Send Message
                       </span>
                       
                       <div className="relative z-10 overflow-hidden w-6 h-6 flex items-center justify-center">
                          <Send className="w-5 h-5 text-white absolute group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-500" />
                          <Send className="w-5 h-5 text-white absolute -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 delay-75" />
                       </div>
                    </button>
                  </div>
               </form>
            </motion.div>
          </div>
          
        </div>
      </Container>
    </Section>
  )
}
