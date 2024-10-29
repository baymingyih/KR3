import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface EmailStepProps {
  form: UseFormReturn<any>;
}

export function EmailStep({ form }: EmailStepProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} type="email" placeholder="your@email.com" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Email</FormLabel>
            <FormControl>
              <Input {...field} type="email" placeholder="Confirm your email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}