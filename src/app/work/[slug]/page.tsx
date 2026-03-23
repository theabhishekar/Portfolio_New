import { notFound } from "next/navigation";
import { CustomMDX } from "@/components/mdx";
import { getPosts } from "@/app/utils/utils";
import {
  AvatarGroup,
  Button,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartImage,
  Text,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { formatDate } from "@/app/utils/formatDate";
import ScrollToHash from "@/components/ScrollToHash";

interface WorkParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params: { slug } }: WorkParams) {
  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    images,
    image,
    team,
  } = post.metadata;
  let ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`;

  return {
    title,
    description,
    images,
    team,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://${baseURL}/work/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Project({ params }: WorkParams) {
  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  const isDsrProject = post.metadata.title === "DSR Innovation Platform";
  const dsrDocsUrl = "https://abhishekar.gitbook.io/dsr/documentation";

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://${baseURL}${post.metadata.image}`
              : `https://${baseURL}/og?title=${post.metadata.title}`,
            url: `https://${baseURL}/work/${post.slug}`,
            author: {
              "@type": "Person",
              name: person.name,
            },
          }),
        }}
      />
      <Column maxWidth="xs" gap="16">
        <Button href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
          Projects
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      </Column>

      {isDsrProject ? (
        <Flex
          fillWidth
          mobileDirection="column"
          horizontal="space-between"
          vertical="start"
          gap="l"
          paddingX="s"
        >
          <Column flex={7} maxWidth={36} gap="16">
            <Flex gap="12" marginBottom="8" vertical="center">
              {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
              <Text variant="body-default-s" onBackground="neutral-weak">
                {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
              </Text>
            </Flex>
            {post.metadata.summary && (
              <Text
                variant="body-default-m"
                onBackground="neutral-strong"
                style={{ lineHeight: 1.6 }}
              >
                {post.metadata.summary}
              </Text>
            )}
            <Column as="article" maxWidth={36}>
              <CustomMDX source={post.content} />
            </Column>
          </Column>
          {post.metadata.images.length > 0 && (
            <Column flex={5} horizontal="center" vertical="start" fillWidth gap="12">
              <Carousel
                sizes="(max-width: 768px) 92vw, 360px"
                aspectRatio="9 / 16"
                imageObjectFit="contain"
                indicator="thumbnail"
                style={{ maxWidth: "22.5rem" }}
                images={post.metadata.images.map((image: string) => ({
                  src: image,
                  alt: post.metadata.title,
                }))}
              />
              <a
                href={dsrDocsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", width: "100%", display: "flex", justifyContent: "center" }}
              >
                <Flex
                  gap="8"
                  vertical="center"
                  paddingX="12"
                  paddingY="8"
                  radius="m"
                  border="neutral-medium"
                  background="neutral-alpha-weak"
                >
                  <img
                    src="/images/projects/project-01/gitbook.svg"
                    alt="GitBook logo"
                    width={40}
                    height={40}
                  />
                  <Text variant="body-default-s">View Documentation on GitBook</Text>
                </Flex>
              </a>
            </Column>
          )}
        </Flex>
      ) : (
        post.metadata.images.length > 0 && (
          <SmartImage
            priority
            aspectRatio="16 / 9"
            radius="m"
            alt="image"
            src={post.metadata.images[0]}
          />
        )
      )}

      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        {!isDsrProject && (
          <Flex gap="12" marginBottom="24" vertical="center">
            {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
            <Text variant="body-default-s" onBackground="neutral-weak">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Text>
          </Flex>
        )}
        {!isDsrProject && <CustomMDX source={post.content} />}
      </Column>
      <ScrollToHash />
    </Column>
  );
}
