import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import Form from "../../../components/ui/Form";
import FormField from "../../../components/ui/FormField";
import { loginSchema, type LoginInput } from "../schema/login.schema";
import { loginOrCreate } from "../service/auth.service";
import { handleZodError } from "../../../utils/handleZodError";

const LoginForm = () => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginInput) => {
    try {
      const user = await loginOrCreate(values);
      console.log(user);
    } catch (error) {
      if (handleZodError(form.setError, error)) return;

      console.error(error);
      form.setError("root", {
        type: "server",
        message: "Something went wrong. Please try again.",
      });
    }
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
