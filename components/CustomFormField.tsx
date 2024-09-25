import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { FormFieldType } from "./forms/RegisterForm"
import Image from "next/image"
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select"

interface CustomProps{
  control: Control<any>,
  fieldType: FormFieldType
  name: string,
  isPassword?: boolean,
  label?: string,
  placeholder?: string
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps}) => {

  const { fieldType, iconSrc, iconAlt, placeholder, renderSkeleton, children, isPassword} = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc as string}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              type={isPassword === true ? 'password' : 'text'}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )

    case FormFieldType.SKELETON:
      return (
        renderSkeleton ? renderSkeleton(field) : null
      )

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      )
  
    default:
      break;
  }
}

const CustomFormField = (props: CustomProps) => {

  const {control, fieldType, name, label} = props;

  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex-1 ">
              {fieldType !== FormFieldType.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
              )}

              <RenderField field={field} props={props}/>

              <FormMessage className="shad-error"/>

            </FormItem>
          )}
        />
  )
}

export default CustomFormField