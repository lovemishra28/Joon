"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { User, Mail, Package, LogOut, Loader2, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button"; 

interface UserProfile {
  name: string;
  email: string;
  imageURL?: string;
  _id: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/user/getUser");
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Failed to load profile");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  // 2. Logout Handler
  const handleLogout = async () => {
    try {
        await axios.get('/api/user/logout');
        router.push('/login');
        router.refresh(); 
    } catch (error) {
        console.log("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* HEADER CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8">
          
          {/* Avatar Circle */}
          <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-md">
             {/* Show Image if exists, else Show Initials */}
             {user?.imageURL ? (
                <img src={user.imageURL} alt="Profile" className="h-full w-full rounded-full object-cover" />
             ) : (
                <span className="text-3xl font-bold text-blue-600">
                    {user?.name?.charAt(0).toUpperCase()}
                </span>
             )}
          </div>

          {/* User Info */}
          <div className="text-center md:text-left flex-1">
             <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
             <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                <Mail className="w-4 h-4" /> {user?.email}
             </p>
             <div className="mt-4 flex gap-3 justify-center md:justify-start">
                <Button variant="outline" className="rounded-full" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </Button>
             </div>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Account Info Box */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-400" />
                    Personal Information
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400 uppercase font-bold tracking-wider">Full Name</label>
                        <p className="text-gray-700 font-medium">{user?.name}</p>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email Address</label>
                        <p className="text-gray-700 font-medium">{user?.email}</p>
                    </div>
                    <div>
                        <label className="text-xs text-gray-400 uppercase font-bold tracking-wider">User ID</label>
                        <p className="text-xs text-gray-400 font-mono bg-gray-50 p-2 rounded inline-block mt-1">
                            {user?._id}
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Actions Box */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-gray-400" />
                    My Activity
                </h2>
                <div className="space-y-3">
                    <Link href="/myOrders">
                        <div className="group flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors cursor-pointer border border-transparent hover:border-blue-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-md shadow-sm">
                                    <Package className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-blue-700">Orders</span>
                            </div>
                            <span className="text-gray-400">→</span>
                        </div>
                    </Link>

                    <Link href="/cart">
                        <div className="group flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors cursor-pointer border border-transparent hover:border-green-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-md shadow-sm">
                                    <MapPin className="w-5 h-5 text-green-600" />
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-green-700">My Addresses (Coming Soon)</span>
                            </div>
                            <span className="text-gray-400">→</span>
                        </div>
                    </Link>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
}