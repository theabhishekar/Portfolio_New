"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@/once-ui/components";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  const isMouNdaProject = title.includes("MoU/NDA");
  const isDsrProject = title.includes("DSR Innovation Platform");

  const detailsBlock = (
    <>
      {title && (
        <Flex flex={5}>
          <Heading as="h2" wrap="balance" variant="heading-strong-xl">
            {title}
          </Heading>
        </Flex>
      )}
      {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
        <Column flex={7} gap="16">
          {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
          {description?.trim() && (
            <Text
              wrap="balance"
              variant={isDsrProject ? "body-default-m" : "body-default-s"}
              onBackground="neutral-weak"
            >
              {description}
            </Text>
          )}
          <Flex gap="24" wrap>
            {content?.trim() && (
              <SmartLink
                suffixIcon="arrowRight"
                style={{ margin: "0", width: "fit-content" }}
                href={href}
              >
                <Text variant="body-default-s">Read case study</Text>
              </SmartLink>
            )}
            {link && (
              <SmartLink
                suffixIcon="arrowUpRightFromSquare"
                style={{ margin: "0", width: "fit-content" }}
                href={link}
              >
                <Text variant="body-default-s">View project</Text>
              </SmartLink>
            )}
          </Flex>
        </Column>
      )}
    </>
  );
  
  return (
    <Column fillWidth gap="m">
      {isDsrProject ? (
        <Flex
          fillWidth
          mobileDirection="column"
          paddingX="s"
          paddingTop="12"
          paddingBottom="24"
          gap="l"
        >
          <Column flex={7} gap="16">
            {detailsBlock}
          </Column>
          <Flex flex={5} horizontal="center">
            <Carousel
              sizes="(max-width: 768px) 92vw, 360px"
              aspectRatio="9 / 16"
              imageObjectFit="contain"
              indicator="thumbnail"
              style={{ maxWidth: "22.5rem" }}
              images={images.map((image) => ({
                src: image,
                alt: title,
              }))}
            />
          </Flex>
        </Flex>
      ) : (
        <>
          <Carousel
            sizes="(max-width: 960px) 100vw, 960px"
            aspectRatio={isMouNdaProject ? "2 / 1" : "16 / 9"}
            images={images.map((image) => ({
              src: image,
              alt: title,
            }))}
          />
          <Flex
            mobileDirection="column"
            fillWidth
            paddingX="s"
            paddingTop="12"
            paddingBottom="24"
            gap="l"
          >
            {detailsBlock}
          </Flex>
        </>
      )}
    </Column>
  );
};
