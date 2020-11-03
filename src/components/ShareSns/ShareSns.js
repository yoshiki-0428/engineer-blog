import * as React from 'react';
import FacebookShareButton from 'react-share/es/FacebookShareButton';
import FacebookIcon from 'react-share/es/FacebookIcon';
import LinkedinShareButton from 'react-share/es/LinkedinShareButton';
import LinkedinIcon from 'react-share/es/LinkedinIcon';
import TwitterShareButton from 'react-share/es/TwitterShareButton';
import TwitterIcon from 'react-share/es/TwitterIcon';
import LineShareButton from 'react-share/es/LineShareButton';
import LineIcon from 'react-share/es/LineIcon';
import 'twin.macro';
import Helmet from 'react-helmet';
import { useSiteMetadata } from '../../hooks';
import { TEXT_BASE_CENTER } from '../Tailwind';

export const ShareSns = ({ articleUrl, articleTitle }) => {
  const { author } = useSiteMetadata();
  const iconSize = 40;

  return (
      <div>
        <Helmet>
          <script type="text/javascript" src="//b.st-hatena.com/js/bookmark_button.js" async/>
        </Helmet>

        <TEXT_BASE_CENTER>よろしければシェアをよろしくお願いします👋</TEXT_BASE_CENTER>
        <div tw="flex justify-center">
          <div tw="m-2">
            <a
              aria-label="share_hatena-bookmark"
              href="http://b.hatena.ne.jp/entry/"
              className="hatena-bookmark-button"
              data-hatena-bookmark-layout="touch-counter"
              title="このエントリーをはてなブックマークに追加"
              style={{ boxShadow: 'none' }}
            >
              <img
                src="https://b.st-hatena.com/images/entry-button/button-only@2x.png"
                alt="このエントリーをはてなブックマークに追加"
                width="24"
                height="24"
                style={{ border: 'none' }}
              />
            </a>
          </div>

          <TwitterShareButton tw="m-2" title={articleTitle} via={author.contacts.twitter} url={articleUrl}>
            <TwitterIcon size={iconSize} round />
          </TwitterShareButton>

          <LinkedinShareButton tw="m-2" url={articleUrl}>
            <LinkedinIcon title={articleTitle} size={iconSize} round />
          </LinkedinShareButton>

          <FacebookShareButton tw="m-2" url={articleUrl}>
            <FacebookIcon size={iconSize} round />
          </FacebookShareButton>

          <LineShareButton tw="m-2" url={articleUrl}>
            <LineIcon size={iconSize} round />
          </LineShareButton>
        </div>
      </div>
  );
};
