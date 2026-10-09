import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import Form from "../../../components/ui/Form";
import FormField from "../../../components/ui/FormField";
import { loginOrCreate } from "../../../services/auth.service";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    const user = await loginOrCreate(values.name);
    console.log(user);
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-4">
      <FormField
        name="name"
        label="Name"
        placeholder="Enter your name"
        autoComplete="username"
      />

      <Button type="submit" disabled={form.formState.isSubmitting}>
        Continue
      </Button>
    </Form>
  );
};

export default LoginForm;
