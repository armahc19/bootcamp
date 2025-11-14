import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockCourses } from "@/data/mockData";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === courseId);

  if (!course) return <div>Course not found</div>;

  const handlePayment = () => {
    toast({
      title: "Payment Successful!",
      description: "You're now enrolled in the course."
    });
    navigate("/student/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" onClick={() => navigate(`/course/${courseId}`)} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">Complete Your Purchase</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <Card className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-green-600" />
                <span className="text-sm text-muted-foreground">Secure checkout</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <Button variant="outline" className="h-16">
                      <CreditCard className="mr-2" />
                      Card
                    </Button>
                    <Button variant="outline" className="h-16">PayPal</Button>
                    <Button variant="outline" className="h-16">Bank</Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input id="name" placeholder="John Doe" className="mt-2" />
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-bold mb-4">Billing Address</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" className="mt-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" className="mt-2" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button onClick={handlePayment} className="w-full" size="lg">
                  Complete Purchase - ${course.price}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                  30-day money-back guarantee.
                </p>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-6">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>
              
              <div className="mb-4">
                <img src={course.thumbnail} alt={course.title} className="w-full rounded-lg mb-3" />
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course Price</span>
                  <span className="font-medium">${course.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600">-$0.00</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${course.price}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  ✓ Lifetime access<br />
                  ✓ Certificate of completion<br />
                  ✓ 30-day money-back guarantee
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
