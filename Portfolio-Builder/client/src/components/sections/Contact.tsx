import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com", color: "hover:text-foreground" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "hover:text-neon-blue" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "hover:text-neon-cyan" },
];

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
      ref={ref}
      data-testid="section-contact"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="glitch font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            data-text="Get In Touch"
            data-testid="text-contact-title"
          >
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-contact-subtitle">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold mb-4 text-neon-cyan" data-testid="text-contact-heading">
                Let's Create Something Amazing
              </h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-contact-description">
                I'm always open to discussing new projects, creative ideas, or opportunities 
                to be part of your vision. Whether you have a question or just want to say hi, 
                I'll try my best to get back to you!
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 group"
                data-testid="contact-info-email"
              >
                <div className="w-12 h-12 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center group-hover:border-neon-cyan/60 transition-colors">
                  <Mail className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:sinhakanishka706@gmail.com" className="font-medium hover:text-neon-cyan transition-colors" data-testid="text-email-value">sinhakanishka706@gmail.com</a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 group"
                data-testid="contact-info-phone"
              >
                <div className="w-12 h-12 rounded-lg bg-neon-magenta/10 border border-neon-magenta/30 flex items-center justify-center group-hover:border-neon-magenta/60 transition-colors">
                  <Phone className="w-5 h-5 text-neon-magenta" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href="tel:+917301576742" className="font-medium hover:text-neon-magenta transition-colors" data-testid="text-phone-value">+91 7301576742</a>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-4 group"
                data-testid="contact-info-location"
              >
                <div className="w-12 h-12 rounded-lg bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center group-hover:border-neon-purple/60 transition-colors">
                  <MapPin className="w-5 h-5 text-neon-purple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium" data-testid="text-location-value">Patna, Bihar, India</p>
                </div>
              </motion.div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-4">Find me on</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground transition-all hover:border-neon-cyan/50 ${social.color}`}
                    data-testid={`link-social-${social.name.toLowerCase()}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name"
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => {
                            setFocusedField(null);
                            field.onBlur();
                          }}
                          className={`bg-card/50 border-border transition-all duration-300 ${
                            focusedField === "name"
                              ? "border-neon-cyan shadow-neon-cyan"
                              : "hover:border-neon-cyan/50"
                          }`}
                          data-testid="input-contact-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your@email.com"
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => {
                            setFocusedField(null);
                            field.onBlur();
                          }}
                          className={`bg-card/50 border-border transition-all duration-300 ${
                            focusedField === "email"
                              ? "border-neon-magenta shadow-neon-magenta"
                              : "hover:border-neon-magenta/50"
                          }`}
                          data-testid="input-contact-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Tell me about your project..."
                          rows={5}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => {
                            setFocusedField(null);
                            field.onBlur();
                          }}
                          className={`bg-card/50 border-border resize-none transition-all duration-300 ${
                            focusedField === "message"
                              ? "border-neon-purple shadow-neon-purple"
                              : "hover:border-neon-purple/50"
                          }`}
                          data-testid="input-contact-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={contactMutation.isPending}
                  className="w-full group relative overflow-visible bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-purple text-white font-semibold animate-glow-pulse"
                  data-testid="button-contact-submit"
                >
                  {contactMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </span>
                  ) : contactMutation.isSuccess ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Sent!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-1/4 left-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-neon-magenta/10 rounded-full blur-3xl" />
    </section>
  );
}
