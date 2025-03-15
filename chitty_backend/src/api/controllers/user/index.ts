import { Context } from "hono";
import { supabase } from "../../app";
import { CreateUser, Login } from "../../schema/user.schema";

export async function getUsers(c: Context) {
  let { data: user, error } = await supabase.from("user").select("*");

  return c.json(user);
}

export async function createUser(c: Context) {
  try {
    const { email, password, name, gender } = await c.req.json<CreateUser>();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    // change this in a bit
    if (error) {
      if (error.status === 429) {
        return c.json({ error: "Too many requests" }, 429);
      }
      if (error.status === 400) {
        return c.json({ error: error.message }, 400);
      }
      return c.json({ error: "Failed to create user" }, 500);
    }

    if (!data.user?.id) {
      return c.json({ error: "User creation failed" }, 500);
    }

    const { error: insertError, data: userData } = await supabase
      .from("user")
      .insert({
        auth_id: data.user.id,
        name: name?.trim(),
        gender: gender?.toLowerCase(),
      })
      .select("id, name, gender")
      .single();

    if (insertError) {
      return c.json({ error: "Failed to create user profile" }, 500);
    }

    return c.json(
      {
        success: true,
        message: "User created successfully",
        data: {
          id: userData.id,
          name: userData.name,
          gender: userData.gender,
        },
      },
      201
    );
  } catch (error) {
    console.error("User creation error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
}

export async function loginUser(c: Context) {
  const { email, password } = await c.req.json<Login>();

  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  console.log(data, error);

  if (error) {
    return c.json({ error: "Failed to login" }, 400);
  }

  return c.json(data);
}
