"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { EmailStep } from '@/components/register/EmailStep';
import { NameStep } from '@/components/register/NameStep';
import { CountryStep } from '@/components/register/CountryStep';
import { registerSchema } from '@/lib/schemas/register';

type FormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      confirmEmail: '',
      firstName: '',
      lastName: '',
      country: '',
    },
    mode: 'onChange', // This enables real-time validation
  });

  const validateCurrentStep = async () => {
    let isValid = false;
    const values = form.getValues();

    try {
      if (step === 1) {
        // Only validate email fields
        await form.trigger(['email', 'confirmEmail']);
        isValid = !form.formState.errors.email && !form.formState.errors.confirmEmail;
      } else if (step === 2) {
        // Only validate name fields
        await form.trigger(['firstName', 'lastName']);
        isValid = !form.formState.errors.firstName && !form.formState.errors.lastName;
      } else if (step === 3) {
        // Only validate country field
        await form.trigger(['country']);
        isValid = !form.formState.errors.country;
      }
      
      console.log('Current step validation result:', isValid);
      return isValid;
    } catch (error) {
      console.error('Validation error:', error);
      return false;
    }
  };

  const onSubmit = async (values: FormData) => {
    if (step < 3) {
      const isValid = await validateCurrentStep();
      if (isValid) {
        setStep(step + 1);
      }
      return;
    }

    // Final step validation
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      // Here you would call your registration function
      toast({
        title: "Registration Successful!",
        description: "Welcome to Kingdom Runners! You can now log in to your account.",
      });
      form.reset();
      setStep(1);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setStep(step + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Join Kingdom Runners</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && <EmailStep form={form} />}
              {step === 2 && <NameStep form={form} />}
              {step === 3 && <CountryStep form={form} />}

              <div className="flex justify-between">
                {step > 1 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep(step - 1)}
                    disabled={isSubmitting}
                  >
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button 
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Complete Registration'}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}