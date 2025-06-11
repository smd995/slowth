"use client";
import { FileInput } from "@/components/atom/fileInput";
import { Input } from "@/components/atom/input";
import { Select } from "@/components/atom/select";
import { createGathering } from "@/effect/gatherings/createGathering";
import { getUTCDate } from "@/libs/date/getUTCDate";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface GatheringFormData {
  name: string;
  location: "건대입구" | "을지로3가" | "신림" | "홍대입구";
  dateTime: string;
  registrationEnd: string;
  image: FileList | null;
  type: "DALLAEMFIT" | "OFFICE_STRETCHING" | "MINDFULNESS" | "WORKATION";
  capacity: number | null;
}

interface GatheringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const today = new Date();
const formattedDate = dayjs(today).format("YYYY-MM-DDTHH:mm");

export const GatheringModal = ({ isOpen, onClose }: GatheringModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GatheringFormData>({
    mode: "onChange",
    delayError: 1000,
    defaultValues: {
      name: "",
      location: "홍대입구",
      dateTime: formattedDate,
      registrationEnd: formattedDate,
      image: null,
      type: "DALLAEMFIT",
      capacity: null,
    },
  });

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (isOpen) {
        document.addEventListener("keydown", handleEscKey);
      }

      return () => {
        document.removeEventListener("keydown", handleEscKey);
      };
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (data: GatheringFormData) => {
    const utcDate = getUTCDate(data.dateTime);
    const utcRegistrationEnd = getUTCDate(data.registrationEnd);
    try {
      await createGathering({
        ...data,
        dateTime: utcDate,
        registrationEnd: utcRegistrationEnd,
      });
      toast.success("모임 생성 성공");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "모임 생성에 실패했습니다");
      } else {
        toast.error("모임 생성에 실패했습니다");
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="bg-opacity-30 bg-secondary-400 fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-xl rounded-lg bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="text-secondary-900 hover:text-secondary-700 absolute top-4 right-4 transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="mb-4">모임 만들기</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="모임 이름"
            error={errors.name?.message}
            {...register("name", {
              required: "모임 이름을 입력해주세요",
              maxLength: {
                value: 20,
                message: "모임 이름은 20자 이하로 입력해주세요",
              },
            })}
            placeholder="모임 이름을 작성해주세요"
          />
          <Select
            label="장소"
            error={errors.location?.message}
            {...register("location", {
              required: "장소를 선택해주세요",
              pattern: {
                value: /^(?!.*\s).+$/,
                message: "장소에 공백이 포함될 수 없습니다.",
              },
            })}
          >
            <option value="">장소를 선택해주세요</option>
            <option value="홍대입구">홍대입구</option>
            <option value="신림">신림</option>
            <option value="건대입구">건대입구</option>
            <option value="을지로3가">을지로3가</option>
          </Select>

          <FileInput
            label="모임 이미지"
            error={errors.image?.message}
            {...register("image", {
              required: "이미지를 첨부해주세요",
            })}
          />

          <div>
            <label className="font-semibold">선택 서비스</label>
            <div className="mt-2 flex gap-4">
              <div className="bg-secondary-50 flex h-18 w-full items-center gap-2 rounded-lg px-4 py-2">
                <input
                  {...register("type", { required: "서비스를 선택해주세요" })}
                  type="radio"
                  value="OFFICE_STRETCHING"
                  id="OFFICE_STRETCHING"
                  className="h-5 w-5 border"
                />
                <label htmlFor="OFFICE_STRETCHING">
                  <h4 className="text-secondary-900 mb-0.5 font-semibold">
                    달램핏
                  </h4>
                  <p className="text-secondary-700 text-xs">오피스 스트레칭</p>
                </label>
              </div>
              <div className="bg-secondary-50 flex h-18 w-full items-center gap-2 rounded-lg px-4 py-2">
                <input
                  {...register("type", { required: "서비스를 선택해주세요" })}
                  type="radio"
                  value="MINDFULNESS"
                  id="MINDFULNESS"
                  className="h-5 w-5"
                />
                <label htmlFor="MINDFULNESS">
                  <h4 className="text-secondary-900 mb-0.5 font-semibold">
                    달램핏
                  </h4>
                  <p className="text-secondary-700 text-xs">마인드 풀니스</p>
                </label>
              </div>
              <div className="bg-secondary-50 flex h-18 w-full items-center gap-2 rounded-lg px-4 py-2">
                <input
                  {...register("type", { required: "서비스를 선택해주세요" })}
                  type="radio"
                  value="WORKATION"
                  id="WORKATION"
                  className="h-5 w-5"
                />
                <label htmlFor="WORKATION">
                  <h4 className="text-secondary-900 mb-0.5 font-semibold">
                    워케이션
                  </h4>
                </label>
              </div>
            </div>
            <div className="min-h-5">
              {errors.type && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <span>⚠️</span>
                  {errors.type?.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <label
                  htmlFor="dateTime"
                  className="text-secondary-700 mb-2 block text-sm font-medium"
                >
                  모임 날짜
                </label>
                <input
                  {...register("dateTime", {
                    required: "모임 날짜를 선택해주세요",
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      return (
                        selectedDate > new Date() ||
                        "현재 시간 이후로 선택해주세요"
                      );
                    },
                  })}
                  type="datetime-local"
                  id="dateTime"
                  className="focus:ring-primary-500 border-secondary-300 w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none"
                />
                <div className="min-h-5">
                  {errors.dateTime && (
                    <p className="flex items-center gap-1 text-sm text-red-600">
                      <span>⚠️</span>
                      {errors.dateTime.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="registrationEnd"
                  className="text-secondary-700 mb-2 block text-sm font-medium"
                >
                  마감 날짜
                </label>
                <input
                  {...register("registrationEnd", {
                    required: "마감 날짜를 선택해주세요",
                    validate: (value, formValues) => {
                      const deadlineDate = new Date(value);
                      const meetingDate = new Date(formValues.dateTime);
                      return (
                        deadlineDate <= meetingDate ||
                        "마감 날짜는 모임 날짜보다 이전이어야 합니다"
                      );
                    },
                  })}
                  type="datetime-local"
                  id="registrationEnd"
                  className="focus:ring-primary-500 border-secondary-300 w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none"
                />
                <div className="min-h-5">
                  {errors.registrationEnd && (
                    <p className="flex items-center gap-1 text-sm text-red-600">
                      <span>⚠️</span>
                      {errors.registrationEnd.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="capacity"
              className="text-secondary-700 mb-2 block text-sm font-medium"
            >
              모임 정원
            </label>
            <input
              {...register("capacity", {
                required: "모임 정원을 입력해주세요",
                min: {
                  value: 5,
                  message: "최소 5명 이상이어야 합니다",
                },
                max: {
                  value: 100,
                  message: "최대 100명까지 가능합니다",
                },
                valueAsNumber: true,
              })}
              type="number"
              id="capacity"
              placeholder="최소 5인 이상 입력해주세요"
              className="border-secondary-300 w-full rounded-md border p-2"
            />
            <div className="min-h-5">
              {errors.capacity && (
                <p className="flex items-center gap-1 text-sm text-red-600">
                  <span>⚠️</span>
                  {errors.capacity.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="hover:bg-primary-700 bg-primary-600 ring-primary-500 w-full rounded-md px-4 py-2 text-white ring-2"
          >
            확인
          </button>
        </form>
      </div>
    </div>
  );
};
