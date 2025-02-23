'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { ChevronRightIcon } from 'lucide-react'
import { useTransition } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { SubmitWaitlist } from './actions'

const WaitlistDialogFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: 'Email is obrigatory.',
    })
    .email({
      message: 'Invalid email.',
    }),
  expect: z.string().trim().min(1, {
    message: 'This camp is obrigatory.',
  }),
  everHadBusiness: z.boolean().default(false).optional(),
})

export type WaitlistDialogFormType = z.infer<typeof WaitlistDialogFormSchema>

interface WaitlistDialogProps {
  children: React.ReactNode
}

export const WaitlistDialog = ({ children }: WaitlistDialogProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition()

  const form = useForm<WaitlistDialogFormType>({
    resolver: zodResolver(WaitlistDialogFormSchema),
    defaultValues: {
      email: '',
      expect: '',
      everHadBusiness: false,
    },
  })

  const onSubmit = (data: WaitlistDialogFormType) => {
    startTransition(() => {
      SubmitWaitlist(data)
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Waitlist.</DialogTitle>
          <DialogDescription>
            Fill in your data to enter the waiting list.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expect"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What you expect for the system?</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="everHadBusiness"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Do you already had an SAAS?</FormLabel>
                    <FormDescription>
                      We need know you more.{' '}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit">
                <span className="group inline-flex items-center">
                  Entrar na lista de espera
                  <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
