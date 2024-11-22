import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'select' | 'radio' | 'textarea';
  label: string;
  required: boolean;
  placeholder?: string;
  validation?: {
    pattern?: string;
    message?: string;
  };
  options?: Array<{ value: string; label: string }>;
}

interface FormSchema {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
}

interface DynamicFormProps {
  schema: FormSchema;
  onSubmit: (data: any) => Promise<void>;
}

function generateZodSchema(schema: FormSchema) {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  schema.fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case 'email':
        fieldSchema = z.string().email(field.validation?.message || 'Invalid email address');
        break;
      case 'select':
      case 'radio':
        fieldSchema = z.enum(field.options?.map(option => option.value) as [string, ...string[]]);
        break;
      default:
        fieldSchema = z.string();
    }

    if (field.required) {
      fieldSchema = fieldSchema.refine(val => val !== '', {
        message: `${field.label} is required`,
      });
    }

    if (field.validation?.pattern) {
      fieldSchema = fieldSchema.refine(
        val => new RegExp(field.validation!.pattern!).test(val),
        {
          message: field.validation.message || `Invalid format for ${field.label}`,
        }
      );
    }

    schemaFields[field.id] = field.required ? fieldSchema : fieldSchema.optional();
  });

  return z.object(schemaFields);
}

export function DynamicForm({ schema, onSubmit }: DynamicFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const zodSchema = generateZodSchema(schema);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(zodSchema),
    mode: 'onChange',
  });

  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold">{schema.formTitle}</h2>
      <p className="text-gray-600 dark:text-gray-300">{schema.formDescription}</p>
      {schema.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          {field.type === 'text' || field.type === 'email' ? (
            <input
              {...register(field.id)}
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onBlur={() => trigger(field.id)}
            />
          ) : field.type === 'textarea' ? (
            <textarea
              {...register(field.id)}
              id={field.id}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              onBlur={() => trigger(field.id)}
            />
          ) : field.type === 'select' ? (
            <Controller
              name={field.id}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          ) : field.type === 'radio' ? (
            <Controller
              name={field.id}
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup onValueChange={onChange} value={value} className="flex flex-col space-y-2">
                  {field.options?.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <RadioGroupItem value={option.value} id={`${field.id}-${option.value}`} />
                      <Label htmlFor={`${field.id}-${option.value}`} className="ml-2">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          ) : null}
          {errors[field.id] && (
            <p className="text-sm text-red-500 dark:text-red-400">{errors[field.id]?.message as string}</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors ${
          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

