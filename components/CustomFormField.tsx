"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

// Interface defining the props for the CustomFormField component.
interface CustomProps {
    control: Control<any>,                                // React Hook Form control for managing form state.
    fieldType: FormFieldType,                             // Enum specifying the type of form field to render.
    name: string,                                         // Name of the field, used as a key in the form's state.
    label?: string,                                       // Optional label for the field.
    placeholder?: string,                                 // Optional placeholder text for the field.
    iconSrc?: string,                                     // Optional source URL for an icon displayed in the field
    iconAlt?: string,                                     // Alternative text for the icon.
    disabled?: boolean,                                   // If true, disables the field.
    dateFormat?: string,                                  // Format string for DatePicker
    showTimeSelect?: boolean,                             // If true, enables time selection in DatePicker.
    children?: React.ReactNode,                           // Children elements, used in custom fields like Select.
    renderSkeleton?: (field: any) => React.ReactNode,     // Custom render function for skeleton loading state.
}


// Function to render different field types based on the provided props.
const RenderField = ({ field, props } : {field: any, props: CustomProps}) => {

  const {fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton} = props;

  // Switch statement to determine the rendering of each field type.
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
            {iconSrc && (
              <Image
                src={iconSrc}
                height={24}
                width={24}
                alt={iconAlt || 'icon'}
                className="ml-2"
              />
            )}
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}                       // Spread operator for field properties from React Hook Form.
                className="shad-input border-0"
              />
            </FormControl>
        </div>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      )
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}       // Updates field value when date changes.
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}         // Configurable date format with a default value.
              showTimeSelect={showTimeSelect ?? false}        // Enables time selection if specified.
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      )
    case FormFieldType.SKELETON:
      return (
        renderSkeleton ? renderSkeleton(field) : null         // Renders custom skeleton if provided.
      )
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder}/>
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      )
    case FormFieldType.TEXTAREA: 
      return (
        <FormControl>
          <Textarea 
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      )
    case FormFieldType.CHECKBOX:
        return (
          <FormControl>
            <div className="flex items-center gap-4">
              <Checkbox
                id={props.name}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label htmlFor={props.name} className="checkbox-label">
                {props.label}
              </label>
            </div>
          </FormControl>
        )
    default:
      break;
  }
}

// Main component for rendering a custom form field
const CustomFormField = (props: CustomProps) => {

  const {control, fieldType, name, label, placeholder, iconSrc, iconAlt} = props;

  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex-1">
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