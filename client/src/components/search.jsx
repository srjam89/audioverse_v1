import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  return (
    <Field orientation="horizontal">
      <div className="relative w-full">
        <Input
          type="text"
          name="search"
          value=""
          placeholder="Search for products..."
          autoComplete="off"
          className="pr-10"
        />

        <Button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 bg-transparent hover:bg-transparent border-none shadow-none"
        >
          <FontAwesomeIcon
            icon={faSearch}
            className="!w-3 !h-3 text-text-h text-(--accent)"
          />
        </Button>
      </div>
    </Field>
  );
}
