'use client';

import type React from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Pencil } from 'lucide-react';

import {
  asChecked,
  asNumber,
  asText,
  getSubmitLabel,
  type UserProfilePageState,
} from './profile-form.helpers';
import { EmploymentStatus } from 'apps/web/src/graphql/generated/graphql';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@team/source-ui';
import { Popover, PopoverContent, PopoverTrigger } from '@team/source-ui';
import { Button } from '@team/source-ui';
import { Calendar } from '@team/source-ui';
import { cn } from '@team/source-ui';

type Props = UserProfilePageState;

const inputStyles =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition-all focus:border-orange-300 focus:ring-2 focus:ring-orange-100';

const disabledInputStyles =
  'w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-400 outline-none cursor-not-allowed';

export function UserProfileForm(props: Props) {
  const { form, loading, created, error, onSubmit, updateField } = props;

  return (
    <div className="relative h-screen overflow-hidden ">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#FB923C_0%,_transparent_30%),radial-gradient(ellipse_at_bottom_right,_#FB923C_0%,_transparent_30%)] pointer-events-none" />

      <div className="relative mx-auto flex h-full max-w-[1027px] items-center">
        <div className="w-full bg-transparent shadow-none">
          <Title />

          <form onSubmit={onSubmit} className="flex flex-col gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-4 px-8">
              <div className="relative">
                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-blue-50 bg-blue-100">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Profile"
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600"
                >
                  <Pencil size={14} />
                </button>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                <IdentityFields form={form} />
                <EditableFields form={form} updateField={updateField} />
              </div>

              <div className="mt-8 flex flex-col items-end gap-3">
                <SubmitButton loading={loading} created={created} />
                <StatusMessages created={created} error={error} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="mb-10 flex flex-col items-center md:items-start">
      <h2 className="text-lg font-medium text-blue-500">Create Profile</h2>
      <div className="mt-1 h-0.5 w-16 bg-blue-500" />
    </div>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      {children}
    </div>
  );
}

function IdentityFields({ form }: Pick<Props, 'form'>) {
  return (
    <>
      <FieldGroup label="Email">
        <input
          value={asText(form.email)}
          disabled
          placeholder="Email"
          className={disabledInputStyles}
        />
      </FieldGroup>

      <FieldGroup label="Name">
        <input
          value={asText(form.name)}
          disabled
          placeholder="Name"
          className={disabledInputStyles}
        />
      </FieldGroup>

      <FieldGroup label="Clerk User ID">
        <input
          value={asText(form.clerkUserId)}
          disabled
          placeholder="Clerk User ID"
          className={disabledInputStyles}
        />
      </FieldGroup>
    </>
  );
}

function EditableFields({
  form,
  updateField,
}: Pick<Props, 'form' | 'updateField'>) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const hireDateValue = form.hireDate
    ? new Date(asText(form.hireDate))
    : undefined;

  return (
    <>
      <FieldGroup label="Employee Role">
        <input
          className={inputStyles}
          placeholder="e.g. Designer"
          value={asText(form.employeeRole)}
          onChange={(e) => updateField('employeeRole', e.target.value)}
        />
      </FieldGroup>

      <FieldGroup label="Department">
        <input
          className={inputStyles}
          placeholder="e.g. Product"
          value={asText(form.department)}
          onChange={(e) => updateField('department', e.target.value)}
        />
      </FieldGroup>

      <FieldGroup label="Responsibility Level">
        <Select
          value={asText(form.responsibilityLevel)}
          onValueChange={(val) => updateField('responsibilityLevel', val)}
        >
          <SelectTrigger className={inputStyles}>
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border bg-white shadow-lg">
            <SelectItem value="L1">L1</SelectItem>
            <SelectItem value="L2">L2</SelectItem>
            <SelectItem value="L3">L3</SelectItem>
          </SelectContent>
        </Select>
      </FieldGroup>

      <FieldGroup label="Employment Status">
        <Select
          value={form.employmentStatus ?? EmploymentStatus.Active}
          onValueChange={(val) =>
            updateField('employmentStatus', val as EmploymentStatus)
          }
        >
          <SelectTrigger className={inputStyles}>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border bg-white shadow-lg">
            <SelectItem value={EmploymentStatus.Active}>Active</SelectItem>
            <SelectItem value={EmploymentStatus.Leave}>Leave</SelectItem>
            <SelectItem value={EmploymentStatus.Probation}>
              Probation
            </SelectItem>
            <SelectItem value={EmploymentStatus.Terminated}>
              Terminated
            </SelectItem>
          </SelectContent>
        </Select>
      </FieldGroup>

      <FieldGroup label="Hire Date">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                inputStyles,
                'justify-start font-normal',
                !form.hireDate && 'text-gray-400',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {hireDateValue ? format(hireDateValue, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={hireDateValue}
              onSelect={(date) => {
                updateField('hireDate', date ? format(date, 'yyyy-MM-dd') : '');
                setCalendarOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FieldGroup>

      <FieldGroup label="Late Arrival Count">
        <input
          type="number"
          className={inputStyles}
          value={asNumber(form.lateArrivalCount)}
          onChange={(e) =>
            updateField('lateArrivalCount', Number(e.target.value))
          }
        />
      </FieldGroup>

      <div className="col-span-full flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          id="okr"
          className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          checked={asChecked(form.okrSubmitted)}
          onChange={(e) => updateField('okrSubmitted', e.target.checked)}
        />
        <label htmlFor="okr" className="text-sm font-medium text-gray-600">
          OKR Submitted
        </label>
      </div>
    </>
  );
}

function SubmitButton({
  loading,
  created,
}: Pick<Props, 'loading' | 'created'>) {
  return (
    <button
      type="submit"
      disabled={loading || created}
      className={cn(
        'w-full rounded-lg px-12 py-3 text-sm font-semibold text-white transition-all md:w-auto',
        loading || created
          ? 'cursor-not-allowed bg-gray-300'
          : 'bg-[#f4a261] shadow-md shadow-orange-200 hover:bg-[#e76f51] active:scale-95',
      )}
    >
      {getSubmitLabel(loading, created)}
    </button>
  );
}

function StatusMessages({ created, error }: Pick<Props, 'created' | 'error'>) {
  return (
    <div className="min-h-[24px]">
      {created && (
        <p className="text-sm text-green-600">
          Employee profile created successfully.
        </p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
