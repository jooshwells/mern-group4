import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

// add back ...props if ends up being needed
export function SignupForm({  }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate()

  const handle_submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data);
  
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      console.log(res);
  
      if (res.ok) {
          navigate("/login");
      }
    } catch (err) {
      console.error("Server error. Please try again later")
    }
  }



  return (
    <>
    <div className="text-center pb-6">
        <h1 className="font-bold text-5xl">NANTA</h1>
        <p><span className="hidden">Oh, God, please!</span>not another note taking app</p>
      </div>
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handle_submit}>
          <FieldGroup>
          <div className="flex flex-row space-x-2">
              <Field>
                <FieldLabel htmlFor="firstname">First Name</FieldLabel>
                <Input name="first_name" id="first_name" type="text" placeholder="First" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastname">Last Name</FieldLabel>
                <Input name="last_name" id="last_name" type="text" placeholder="Doe" required />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="jdoe@example.com"
                required
              />
            </Field>
            <div className="flex flex-row space-x-2">
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input name="password" id="password" type="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input name="confirm_password" id="confirm_password" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            </div>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>

              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
    </>
  )
}
