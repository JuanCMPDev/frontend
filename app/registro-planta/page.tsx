import PlantRegisterForm from "@/components/forms/PlantRegistrationForm"
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[491px]">
          <div className="flex mb-12 items-center gap-2">
            <Image
              src="assets/icons/logo.svg"
              height={1000}
              width={1000}
              alt="Green Genesis logo"
              className="h-10 w-fit"
            />
            <h1>Green Genesis</h1>
          </div>
          <PlantRegisterForm />
        </div>
      </section>
      <Image
        src="/assets/img/register-img.png"
        height={1000}
        width={1000}
        alt="register_side_img"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
