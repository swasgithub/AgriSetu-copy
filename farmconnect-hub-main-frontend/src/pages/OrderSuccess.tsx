import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Package, Truck, Home, ShoppingBag, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { totalAmount } = location.state || { totalAmount: 0 };

    const steps = [
        { label: "Order Placed", date: "Today, 5:30 PM", status: "completed", icon: ShoppingBag },
        { label: "Processing", date: "Expected by tomorrow", status: "current", icon: Clock },
        { label: "Shipped", date: "Coming soon", status: "upcoming", icon: Package },
        { label: "Out for Delivery", date: "Coming soon", status: "upcoming", icon: Truck },
        { label: "Delivered", date: "Coming soon", status: "upcoming", icon: Home },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-muted/30">
            <Navbar />
            
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Success Message */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                            <CheckCircle2 className="w-12 h-12 text-primary animate-bounce" />
                        </div>
                        <h1 className="text-4xl font-bold text-foreground mb-4">Order Placed Successfully!</h1>
                        <p className="text-muted-foreground text-lg mb-8">
                            Thank you for your purchase. Your order has been recorded and is being processed.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button onClick={() => navigate("/dashboard/farmer")} variant="default">
                                Go to Dashboard
                            </Button>
                            <Button onClick={() => navigate("/buy")} variant="outline">
                                Continue Shopping
                            </Button>
                        </div>
                    </div>

                    {/* Order Tracking Visualization */}
                    <Card className="overflow-hidden border-none shadow-lg">
                        <div className="bg-primary p-6 text-primary-foreground">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-primary-foreground/80 text-sm font-medium">Order Amount</p>
                                    <h3 className="text-2xl font-bold">₹{totalAmount}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-primary-foreground/80 text-sm font-medium">Expected Delivery</p>
                                    <h3 className="text-lg font-semibold">Apr 29, 2026</h3>
                                </div>
                            </div>
                        </div>
                        <CardContent className="p-8">
                            <h3 className="text-xl font-bold mb-8">Track Your Order</h3>
                            
                            <div className="relative">
                                {/* Vertical Line */}
                                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted" />

                                <div className="space-y-10">
                                    {steps.map((step, index) => (
                                        <div key={index} className="relative flex items-start gap-8">
                                            {/* Step Icon */}
                                            <div 
                                                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 border-background shadow-md transition-colors ${
                                                    step.status === "completed" 
                                                        ? "bg-primary text-primary-foreground" 
                                                        : step.status === "current"
                                                            ? "bg-leaf-light text-primary border-primary/20"
                                                            : "bg-muted text-muted-foreground"
                                                }`}
                                            >
                                                <step.icon className="w-5 h-5" />
                                            </div>

                                            {/* Step Content */}
                                            <div className="flex-1 pt-1">
                                                <h4 className={`font-bold ${
                                                    step.status === "completed" ? "text-foreground" : "text-muted-foreground"
                                                }`}>
                                                    {step.label}
                                                </h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {step.date}
                                                </p>
                                            </div>

                                            {/* Status Badge */}
                                            <div className="hidden sm:block pt-1">
                                                {step.status === "completed" && (
                                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase">
                                                        Done
                                                    </span>
                                                )}
                                                {step.status === "current" && (
                                                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase animate-pulse">
                                                        In Progress
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderSuccess;
