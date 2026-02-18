"use client";

import { useEffect, useState } from "react";
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
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { authService } from "@/lib/authService";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await authService.login({ email, password });
      const token = data.data?.accessToken || data.token;
      const user = data.data?.user || data.user;

      if (token) {
        authService.setAuthData(token, user);
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Login failed: No access token");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0E1416] flex items-center justify-center p-6 select-none">
      <Card className="w-full max-w-sm border-white/5 bg-[#161F21]/80 backdrop-blur-md shadow-xl">
        <CardHeader className="space-y-1 pb-6 text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Sign In
          </CardTitle>
          <CardDescription className="text-slate-400 text-sm">
            Access your admin dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-slate-300 text-xs font-semibold uppercase tracking-wider"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0E1416]/50 border-white/10 focus:border-emerald-500/50 text-white placeholder:text-slate-600 h-10 rounded-lg text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                title="password"
                className="text-slate-300 text-xs font-semibold uppercase tracking-wider"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[#0E1416]/50 border-white/10 focus:border-emerald-500/50 text-white h-10 rounded-lg pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-500 p-1"
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
              <div className="text-[13px] text-red-400 bg-red-500/10 border border-red-500/20 py-2.5 px-3 rounded-lg text-center font-medium">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full cursor-pointer h-10 bg-emerald-500 hover:bg-emerald-400 text-[#0E1416] font-bold rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span>Login</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
