import React from 'react';
import Disqus from 'gatsby-plugin-disqus';
import { format } from 'date-fns';
import { kebabCase } from 'lodash/string';
import Tags from '../Tags';
import { ShareSns } from '../ShareSns/ShareSns';
import { useAllMarkdownRemarkForPopularList, useSiteMetadata, useTagsList } from '../../hooks';
import ImageWrap from '../Image/ImageWrap';
import InstantView from '../InstantView';
import {
  CARD, HR, SPACER, TEXT_BASE_CENTER, TEXT_GATSBY_LINK, TITLE_H1, TITLE_H3
} from '../Tailwind';
import 'twin.macro';
import Iframely from '../Iframely';
import { YYYY_MM_DD } from '../../constants/dateFormat';

const Post = ({ post }) => {
  const { id, html } = post;
  const { slug } = post.fields;
  const {
    title, socialImage, category, tags
  } = post.frontmatter;
  const group = useTagsList();
  // Tag Listから自分以外のタグで関連するURLを抽出
  const relatedLinks = group.filter((g) => tags.includes(g.fieldValue))
    .flatMap((g) => g.edges)
    .map((edge) => edge.node.fields.slug)
    .filter((url) => url !== slug);
  const { url, disqusShortname } = useSiteMetadata();
  const relatedArticles = relatedLinks
    ? useAllMarkdownRemarkForPopularList(Array.from(new Set(relatedLinks)))
    : [];

  const convertTags = tags.map((tag) => ({ fieldValue: tag }));
  const date = format(new Date(post.frontmatter.date), YYYY_MM_DD);
  const updatedDate = post.frontmatter.updatedDate
    ? format(new Date(post.frontmatter.updatedDate), YYYY_MM_DD)
    : null;

  return (
    <div>
      <Iframely/>
      <CARD mb>
        <SPACER>
          <TEXT_BASE_CENTER>
            <time dateTime={date}>
              {date}
            </time>
            {updatedDate && (
                <>(更新日:
                    <time dateTime={updatedDate}>
                      {updatedDate}
                    </time>
                  )
                </>
            )}
          </TEXT_BASE_CENTER>

          <TITLE_H1>{title}</TITLE_H1>
          <TEXT_GATSBY_LINK to={`/category/${kebabCase(category)}`}>{category}</TEXT_GATSBY_LINK>
        </SPACER>
      </CARD>
      <ImageWrap item={{ socialImage }} size={'normal'} />
      <CARD top>
        <SPACER>
          <ShareSns articleUrl={url + slug} articleTitle={title} />
          <div tw="my-4">
            <div className={'content'} dangerouslySetInnerHTML={{ __html: html }} />
          </div>
          <Tags tags={convertTags} urlPrefix={'tags'} />
          <ShareSns articleUrl={url + slug} articleTitle={title} />
        </SPACER>
      </CARD>

      {disqusShortname
          && <CARD>
            <SPACER>
              <Disqus
                  identifier={id}
                  title={title}
                  url={url + slug}
              />
            </SPACER>
          </CARD>
      }

      {relatedArticles.length !== 0
          && <CARD>
            <SPACER>
              <TITLE_H3>Related Links</TITLE_H3>
              <HR/>
              <InstantView flex items={relatedArticles} />
            </SPACER>
          </CARD>
      }
    </div>
  );
};

export default Post;
