'use client';

import type React from 'react';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { format } from 'date-fns';
import { CalendarIcon, Pencil } from 'lucide-react';

import {
  asChecked,
  asNumber,
  asText,
  getSaveLabel,
  type SettingsPageState,
} from './settings-form.helpers';
import { EmploymentStatus } from '../../../graphql/generated/graphql';

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

type Props = SettingsPageState;

const inputStyles =
  'h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition-all focus:border-orange-300 focus:ring-2 focus:ring-orange-100';

const disabledInputStyles =
  'h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 opacity-100 outline-none cursor-not-allowed';

const selectTriggerStyles =
  '!h-11 !w-full !rounded-lg !border-gray-200 !bg-white !px-4 !text-sm !shadow-none focus:!border-orange-300 focus:!ring-2 focus:!ring-orange-100';

const dateTriggerStyles =
  '!h-11 !w-full !justify-start !rounded-lg !border-gray-200 !bg-white !px-4 !text-sm !font-normal !shadow-none hover:!bg-white focus:!border-orange-300 focus:!ring-2 focus:!ring-orange-100';

export function SettingsForm(props: Props) {
  const { form, loading, saved, error, onSubmit, updateField } = props;

  return (
    <div className="relative h-[calc(100vh-72px)] overflow-hidden bg-white ">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[-120px] h-[420px] blur-3xl opacity-90 "
        style={{
          background: `
            radial-gradient(55% 85% at 22% 100%, rgba(251,146,60,0.95) 0%, rgba(251,146,60,0.75) 28%, rgba(251,146,60,0.35) 52%, rgba(251,146,60,0.12) 68%, transparent 82%),
            radial-gradient(55% 85% at 78% 100%, rgba(251,146,60,0.95) 0%, rgba(251,146,60,0.75) 28%, rgba(251,146,60,0.35) 52%, rgba(251,146,60,0.12) 68%, transparent 82%)
          `,
        }}
      />

      <div className="relative mx-auto mt-40 h-full max-w-[1027px] ">
        <div className="w-full bg-transparent shadow-none">
          <Title />

          <form onSubmit={onSubmit} className="flex flex-col gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-4 px-8">
              <div className="relative">
                <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-blue-50 bg-blue-100">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anujin"
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
                <IdentityFields />
                <EditableFields form={form} updateField={updateField} />
              </div>

              <div className="mt-8 flex flex-col items-end gap-3">
                <SubmitButton loading={loading} saved={saved} />
                <StatusMessages saved={saved} error={error} />
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
      <h2 className="text-lg font-medium text-blue-500">Edit Profile</h2>
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

function IdentityFields() {
  const { user, isLoaded } = useUser();

  const email = isLoaded ? (user?.primaryEmailAddress?.emailAddress ?? '') : '';
  const name = isLoaded ? (user?.fullName ?? user?.username ?? '') : '';

  return (
    <>
      <FieldGroup label="Email">
        <input
          value={email}
          readOnly
          placeholder="Email"
          className={disabledInputStyles}
        />
      </FieldGroup>

      <FieldGroup label="Name">
        <input
          value={name}
          readOnly
          placeholder="Name"
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
          <SelectTrigger className={selectTriggerStyles}>
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border bg-white shadow-lg">
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
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
          <SelectTrigger className={selectTriggerStyles}>
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
                dateTriggerStyles,
                !form.hireDate && 'text-gray-400',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {hireDateValue ? format(hireDateValue, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto bg-white p-0" align="start">
            <Calendar
              mode="single"
              selected={hireDateValue}
              onSelect={(date) => {
                updateField('hireDate', date ? format(date, 'yyyy-MM-dd') : '');
                setCalendarOpen(false);
              }}
              captionLayout="dropdown"
              fromYear={1990}
              toYear={new Date().getFullYear() + 5}
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

function SubmitButton({ loading, saved }: Pick<Props, 'loading' | 'saved'>) {
  return (
    <button
      type="submit"
      disabled={loading || saved}
      className={cn(
        'w-full rounded-lg px-12 py-3 text-sm font-semibold text-white transition-all md:w-auto',
        loading || saved
          ? 'cursor-not-allowed bg-gray-300'
          : 'bg-[#f4a261] shadow-md shadow-orange-200 hover:bg-[#e76f51] active:scale-95',
      )}
    >
      {getSaveLabel(loading, saved)}
    </button>
  );
}

function StatusMessages({ saved, error }: Pick<Props, 'saved' | 'error'>) {
  return (
    <div className="min-h-[24px]">
      {saved && (
        <p className="text-sm text-green-600">Settings saved successfully.</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
