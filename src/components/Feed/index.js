import React from 'react';
import { Link } from 'gatsby';
import { format } from 'date-fns';
import Tags from '../Tags';
import ImageWrap from '../Image/ImageWrap';
import {
  BUTTON_CENTER, CARD,
  SPACER,
  TEXT_BASE_CENTER,
  TEXT_GATSBY_LINK,
  TEXT_GATSBY_LINK_H1,
} from '../Tailwind';
import { YYYY_MM_DD } from '../../constants/dateFormat';

const Feed = ({ edges }) => (
      <div>
        {edges.map((edge) => (
            <CARD key={edge.node.fields.slug}>
              <SPACER>
                <TEXT_BASE_CENTER>
                  <time dateTime={format(new Date(edge.node.frontmatter.date), YYYY_MM_DD)}>
                    {format(new Date(edge.node.frontmatter.date), YYYY_MM_DD)}
                  </time>
                  {edge.node.frontmatter.updatedDate && (
                      <> (更新日:
                        <time
                          dateTime={
                            format(new Date(edge.node.frontmatter.updatedDate), YYYY_MM_DD)}>
                          {format(new Date(edge.node.frontmatter.updatedDate), YYYY_MM_DD)}
                        </time>
                        )
                      </>
                  )}
                </TEXT_BASE_CENTER>
                <TEXT_GATSBY_LINK_H1 to={edge.node.fields.slug}>
                  {edge.node.frontmatter.title}
                </TEXT_GATSBY_LINK_H1>

                <TEXT_GATSBY_LINK to={edge.node.fields.categorySlug}>
                  {edge.node.frontmatter.category}
                </TEXT_GATSBY_LINK>
              </SPACER>
              <Link to={edge.node.fields.slug}>
                <ImageWrap
                    size={'normal'}
                    item={{ socialImage: edge.node.frontmatter.socialImage }} />
              </Link>
              <SPACER>
                <TEXT_BASE_CENTER>{edge.node.excerpt}</TEXT_BASE_CENTER>
                <BUTTON_CENTER to={edge.node.fields.slug}>READ MORE</BUTTON_CENTER>
                <Tags tags={edge.node.frontmatter.tags.map((t) => ({ fieldValue: t }))} urlPrefix={'tags'}/>
              </SPACER>
            </CARD>
        ))}
      </div>
);

export default Feed;
