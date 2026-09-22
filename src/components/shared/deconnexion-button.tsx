"use client";

import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { deconnexion } from "@/actions/auth";

export function DeconnexionButton() {
  return (
    <form action={deconnexion}>
      <Button variant="ghost" size="icon" type="submit" aria-label="Abmelden">
        <FaArrowRightFromBracket />
      </Button>
    </form>
  );
}