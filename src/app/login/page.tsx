"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { authService } from "@/lib/authService";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await authService.login({ email, password });

      // Handle successful login prioritising data.accessToken from response structure
      const token = data.data?.accessToken || data.token;
      const user = data.data?.user || data.user;

      if (token) {
        authService.setAuthData(token, user);
        router.push("/");
        router.refresh();
      } else {
        throw new Error("No token received from server");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to login. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F1719] px-4 selection:bg-emerald-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

      <Card className="w-full max-w-md border-white/5 bg-[#1C2629]/50 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0 opacity-50" />

        <CardHeader className="space-y-2 pb-8 pt-8">
          <div className="mx-auto bg-emerald-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-2 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
            <Lock className="w-6 h-6 text-emerald-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-center bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent">
            Admin Access
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Secure authentication for portfolio management
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 ml-1">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0F1719]/50 border-white/5 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white placeholder:text-gray-600 h-11 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                title="password"
                className="text-gray-300 ml-1"
              >
                Password
              </Label>
              <div className="relative group/pass">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#0F1719]/50 border-white/5 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white h-11 pr-11 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-500 dark:text-gray-400 transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 py-3 px-4 rounded-lg text-center animate-in fade-in zoom-in duration-300">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-[#0F1719] font-bold text-lg shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>

        <div className="pb-8 text-center">
          <div className="h-px w-24 bg-linear-to-r from-transparent via-white/5 to-transparent mx-auto mb-4" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-medium">
            Private Access Only
          </p>
        </div>
      </Card>
    </div>
  );
}
