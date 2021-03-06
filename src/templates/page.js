/* eslint react/prop-types: 0 */
import React from 'react';
import { graphql } from 'gatsby';

import Header from '../components/Header';
import Card from '../components/Card';
import Sidebar from '../components/Sidebar';
import SEO from '../components/SEO';
import Pagination from '../components/Pagination';
import { parseDate, getPath, getMaxPages } from '../api';
import { getFirstParagraph } from '../api/text';
import wrapLayout from '../api/layout';
import ShareBox from '../components/ShareBox';

import { config } from '../../data/index';

const defaultColor = config.posts.defaultHeaderBackgroundColor;
const { title, iconUrl, meta } = config;
const { description } = meta;
const getTitle = (pageNumber = '1') => (pageNumber === '1' ? '' : ` ${pageNumber} ページ`);

const Page = ({ data, location }) => (
  <div className="row homepage">
    {false && (
      <Header
        img={data.header.headerImage}
        title={data.header.title}
        titleVisible={data.header.titleVisible}
        subTitle={data.header.subTitle}
        subTitleVisible={data.header.subTitleVisible}
      />
    )}
    <Sidebar totalCount={data.latestPosts.totalCount} posts={data.latestPosts.edges} />
    <div className="col-xl-6 col-lg-7 col-md-12 col-xs-12 order-2">
      <div className="row">
        {data.pagePosts.edges.map(({ node }, index) => (
          <Card
            title={node.title}
            date={parseDate(node.createdDate)}
            url={node.url}
            headerSize={node.headerSize}
            headerImage={node.headerImgur}
            headerBackgroundColor={node.headerBackgroundColor || defaultColor}
            key={node.title}
            index={index}
            content={getFirstParagraph(node.content)}
            tags={node.tags}
            async={index > 1}
          />
        ))}
      </div>
      <Pagination
        pageCount={getMaxPages(data.allPosts.edges.length)}
        pathname={location.pathname}
      />
    </div>
    <div className="col-xl-2 col-lg-1 order-3" />
    <ShareBox url={location.href} hasCommentBox={false} />
    <SEO
      title={getTitle(location.pathname.split('/')[2])}
      url={getPath()}
      description={description}
      image={iconUrl}
      siteTitleAlt={title}
      isPost={false}
    />
  </div>
);

export default wrapLayout(Page);

export const pageQuery = graphql`
  query getNextPage($limit: Int, $skip: Int) {
    header(purpose: { eq: "Home" }) {
      headerImage
      title
      titleVisible
      subTitle
      subTitleVisible
    }
    allPosts: allPostMarkdown(sort: { fields: [createdDate], order: DESC }, filter: {hiddenPage: {ne: true}}) {
      edges {
        node {
          id
        }
      }
    }
    latestPosts: allPostMarkdown(limit: 6, sort: { fields: [createdDate], order: DESC }, filter: {hiddenPage: {ne: true}}) {
      totalCount
      edges {
        node {
          title
          url
          createdDate
        }
      }
    }
    pagePosts: allPostMarkdown(
      sort: { order: DESC, fields: [createdDate] }
      limit: $limit
      skip: $skip,
      filter: {hiddenPage: {ne: true}}
    ) {
      edges {
        node {
          title
          createdDate
          url
          headerImgur
          content
          tags
        }
      }
    }
  }
`;
