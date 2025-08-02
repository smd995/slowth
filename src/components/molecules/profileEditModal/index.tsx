import { Button, Modal, Input } from "@/shared/ui";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { User, useUserStore, updateUser } from "@/entities/user";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export const ProfileEditModal = ({
  isOpen,
  onClose,
  user,
}: ProfileEditModalProps) => {
  const { setUser } = useUserStore();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    delayError: 1000,
    defaultValues: {
      image: null,
      companyName: user?.companyName || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: {
    image: FileList | null;
    companyName: string;
  }) => {
    try {
      const result = await updateUser(data);
      setUser(result); // 상태 업데이트 추가
      toast.success("사용자 수정 성공");
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "사용자 수정에 실패했습니다",
        );
      } else {
        toast.error("사용자 수정에 실패했습니다");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="프로필 수정하기">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full">
            <Image
              src={previewImage || user?.image || "/image/alt-profile.png"}
              alt="profile-edit"
              fill
              sizes="56px"
              className="rounded-full object-cover"
            />
          </div>

          <div className="absolute top-9 left-9 cursor-pointer rounded-full transition-colors">
            <div className="relative">
              <input
                {...register("image", {
                  required: "이미지를 첨부해주세요",
                })}
                type="file"
                className="absolute h-4.5 w-4.5 rounded-full opacity-0"
                onChange={handleImageChange}
              ></input>
            </div>
            <Image
              src="/image/btn_edit.svg"
              alt="프로필 수정"
              width={18}
              height={18}
            />
          </div>
          {/* 에러 메시지 표시 */}
          <div className="mt-2 min-h-6">
            {errors.image && (
              <p className="text-sm text-red-600">{errors.image.message}</p>
            )}
          </div>
        </div>
        <div>
          <h4 className="text-secondary-800 mb-3 text-base font-semibold">
            회사
          </h4>
          <Input
            type="text"
            {...register("companyName", {
              required: "회사이름을 입력해주세요",
            })}
            error={errors.companyName?.message}
          />
        </div>
        <div className="flex gap-4">
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            취소
          </Button>
          <Button size="lg" variant="primary" className="w-full">
            수정하기
          </Button>
        </div>
      </form>
    </Modal>
  );
};
