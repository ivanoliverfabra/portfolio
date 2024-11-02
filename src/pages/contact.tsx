import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useMousePosition } from "~/providers/mouse-position";

const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

export function ContactPage() {
  const [hoveringSubmit, setHoveringSubmit] = useState(false);
  const { setColor, setLoading } = useMousePosition();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: z.infer<typeof contactFormSchema>) {
    setLoading(true);
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      form.reset();
      toast.success(response.message);
    } catch {
      toast.error(
        "An error occurred while sending your message. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (form.formState.isSubmitting) return setColor("gold");
    if (!hoveringSubmit) return setColor(null);
    if (!form.formState.isValid) return setColor("lightcoral");
    setColor("lightgreen");
  }, [
    hoveringSubmit,
    form.formState.isSubmitting,
    form.formState.errors,
    form.formState.isValid,
    setColor,
    setLoading,
  ]);

  return (
    <div className="h-full w-full bg-background/70 backdrop-blur-lg overflow-y-visible mb-16 z-20">
      <Helmet>
        <title>Contact - Ivan Oliver</title>
      </Helmet>
      <div className="h-auto w-full flex flex-col gap-y-4 p-4">
        <div className="items-center flex flex-col sm:flex-row justify-between border-b pt-6 pb-2">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
        </div>

        <div className="w-full gap-4 bg-card/80 p-4 rounded-3xl flex flex-col">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full gap-4 grid lg:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea {...field} cols={30} rows={10} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="w-fit px-4 py-2 border hover:border-primary/25 transition-colors duration-200 hover:bg-primary/5 rounded-lg"
                onMouseEnter={() => setHoveringSubmit(true)}
                onMouseLeave={() => setHoveringSubmit(false)}
              >
                {form.formState.isSubmitting ? "Sending..." : "Send"}
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
