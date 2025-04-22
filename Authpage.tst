import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, ShieldCheck, Users, LogIn } from "lucide-react";
import SolarSystemLogo from "@/components/logo/solar-system-logo";

const loginSchema = insertUserSchema;
const registerSchema = insertUserSchema;

export default function AuthPage() {
  const [location, navigate] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation.mutate(values);
  }

  // Register form
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    registerMutation.mutate(values);
  }

  const [showAuth, setShowAuth] = useState(false);
  
  return (
    <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 py-10">
      <div className="relative hidden h-full flex-col p-10 text-white lg:flex rounded-[40px] overflow-hidden">
        <div className="absolute inset-0 bg-primary rounded-[40px]" />
        
        <motion.div 
          className="relative z-20 flex items-center text-lg font-medium"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <SolarSystemLogo size={50} />
          <span className="ml-2 text-xl font-bold">THECODEFORUM.COM</span>
        </motion.div>
        
        <motion.div 
          className="relative z-20 flex-grow flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <SolarSystemLogo size={180} />
        </motion.div>
        
        <motion.div 
          className="relative z-20 mt-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <blockquote className="space-y-2 bg-white/10 p-6 rounded-[30px]">
            <p className="text-lg">
              "THECODEFORUM has transformed how our development team collaborates on code projects. The private forums ensure our discussions remain secure."
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </motion.div>
        
        <motion.div 
          className="relative z-20 mt-10 space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-full">
            <div className="bg-white/20 p-2 rounded-full">
              <ShieldCheck size={24} />
            </div>
            <p className="text-sm">Secure, private forums with code-based access</p>
          </div>
          <div className="flex items-center space-x-4 bg-white/10 p-4 rounded-full">
            <div className="bg-white/20 p-2 rounded-full">
              <Users size={24} />
            </div>
            <p className="text-sm">Join discussions using a simple 5-character code</p>
          </div>
        </motion.div>
      </div>
      
      <div className="lg:p-8 flex items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <AnimatePresence>
            {!showAuth ? (
              <motion.div 
                key="welcome"
                className="flex flex-col items-center space-y-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SolarSystemLogo size={120} />
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-4">
                    Welcome to THECODEFORUM
                  </h1>
                  <p className="text-lg text-muted-foreground mb-10">
                    Join private coding forums where developers collaborate securely
                  </p>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="rounded-full px-10 py-6 text-lg flex items-center space-x-2"
                    size="lg"
                    onClick={() => setShowAuth(true)}
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    Get Started
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="auth"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col space-y-6 w-full"
              >
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Access Your Account
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Enter your credentials to join private coding forums
                  </p>
                </div>

                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 rounded-full">
                    <TabsTrigger value="login" className="rounded-full">Login</TabsTrigger>
                    <TabsTrigger value="register" className="rounded-full">Register</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <Card className="border rounded-[30px] overflow-hidden">
                      <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                          Enter your username and password to access your account
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Form {...loginForm}>
                          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                            <FormField
                              control={loginForm.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Username</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="johndoe" 
                                      className="rounded-full" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={loginForm.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="password" 
                                      placeholder="••••••••" 
                                      className="rounded-full" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                              <Button 
                                type="submit" 
                                className="w-full rounded-full py-6" 
                                disabled={loginMutation.isPending}
                              >
                                {loginMutation.isPending ? "Logging in..." : "Log in"}
                              </Button>
                            </motion.div>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <Card className="border rounded-[30px] overflow-hidden">
                      <CardHeader>
                        <CardTitle>Create an Account</CardTitle>
                        <CardDescription>
                          Create your account to join private coding forums
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Form {...registerForm}>
                          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                            <FormField
                              control={registerForm.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Username</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="johndoe" 
                                      className="rounded-full" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={registerForm.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="password" 
                                      placeholder="••••••••" 
                                      className="rounded-full" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                              <Button 
                                type="submit" 
                                className="w-full rounded-full py-6" 
                                disabled={registerMutation.isPending}
                              >
                                {registerMutation.isPending ? "Creating account..." : "Create account"}
                              </Button>
                            </motion.div>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                <motion.div 
                  className="text-center mt-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <Button 
                    variant="ghost" 
                    className="rounded-full" 
                    onClick={() => setShowAuth(false)}
                  >
                    Go back
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
