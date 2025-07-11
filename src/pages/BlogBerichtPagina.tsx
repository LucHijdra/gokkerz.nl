import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/HoofdLayoutComponent';
import { Button } from '@/components/ui/KnopComponent';
import { BlogPostCard } from '@/components/BlogPostCard';
import { Clock, User, Calendar, ArrowLeft, Share2, Star, Check } from 'lucide-react';
import { casinos, getCasinoUrl } from '@/pages/CasinoOverzichtPagina';
import { blogPosts } from '../lib/blogBerichtenData';
import { Helmet } from 'react-helmet';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((b) => b.slug === slug);

  // Get other recent blogs excluding current
  const recentBlogs = blogPosts
    .filter((b) => b.slug !== slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);


  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="mb-4 text-2xl font-bold">Blog niet gevonden</h1>
          <p className="text-gray-600">Deze blogpost bestaat niet of is verwijderd.</p>
          <Link to="/blog" className="text-gokkerz-green underline">
            Terug naar het blogoverzicht
          </Link>
        </div>
      </Layout>
    );
  }

  const shareUrl = window.location.href;

  return (
    <Layout>
      <Helmet>
        <title>{post.title} | Gokkerz Casino Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>

      {/* Meta Information Bar */}
      <div className="border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:py-4">
            {/* Category */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-gokkerz-green px-2.5 py-0.5 text-xs font-medium text-white sm:text-sm">
                {post.category}
              </span>
            </div>
            {/* Datum links, profielfoto rechts */}
            <div className="flex items-center justify-between gap-4 sm:justify-end w-full">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 sm:gap-2 sm:text-sm">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <time>{post.date}</time>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <img
                  src={post.authorPhoto}
                  alt={post.author}
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover object-top border border-gray-200 bg-white"
                  style={{ minWidth: 32, minHeight: 32 }}
                />
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium text-gray-900 sm:text-sm text-left">{post.author}</span>
                  <span className="text-xs text-gray-500">Casino Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full sm:h-[50vh] sm:min-h-[400px]">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>

        <div className="container mx-auto h-full px-4">
          <div className="relative flex h-full max-w-4xl flex-col justify-end pb-8 sm:pb-16">
            <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl text-left">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Article Content */}
            <article className="max-w-4xl flex-1">
              {/* Article Body */}
              <div className="prose prose-green mb-8 max-w-none text-left sm:mb-12 [&>*]:text-left">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Share Section */}
              <div className="my-8 border-b border-t border-gray-200 py-4 sm:my-12 sm:py-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 sm:text-base">
                    Deel dit artikel
                  </span>
                  <div className="flex gap-3 sm:gap-4">
                    <button
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`,
                          '_blank'
                        )
                      }
                      className="rounded-full bg-gray-100 p-1.5 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-500 sm:p-2"
                    >
                      <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      onClick={() =>
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
                          '_blank'
                        )
                      }
                      className="rounded-full bg-gray-100 p-1.5 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-500 sm:p-2"
                    >
                      <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <div className="mb-8 flex justify-center">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                  <img
                    src={post.authorPhoto}
                    alt={post.author}
                    className="h-24 w-24 rounded-lg object-cover object-top shadow-md bg-white mb-3 sm:mb-0 self-start"
                    style={{ minWidth: 96, minHeight: 96 }}
                  />
                  <div className="flex-1 text-left">
                    <h3 className="mb-2 text-lg font-semibold sm:text-xl">Over de auteur</h3>
                    {post.author === 'Linde' && (
                      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                        Linde is onze nieuwsredacteur en volgt dagelijks de ontwikkelingen in de online
                        casino wereld. Met een scherp oog voor trends en actualiteit brengt zij het
                        laatste nieuws en de belangrijkste updates voor spelers in Nederland.
                      </p>
                    )}
                    {post.author === 'Ruben' && (
                      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                        Ruben is dé reviewer van Gokkerz.nl. Hij test en beoordeelt alle casino’s en
                        spellen tot in detail. Zijn eerlijke mening en uitgebreide ervaring zorgen
                        ervoor dat jij altijd weet waar je aan toe bent bij een nieuwe aanbieder.
                      </p>
                    )}
                    {post.author === 'Jack' && (
                      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                        Jack is onze gidsenspecialist. Hij schrijft heldere uitleg en praktische
                        stappenplannen voor zowel beginnende als gevorderde spelers. Met zijn tips haal
                        je het maximale uit je casino-ervaring.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  asChild
                  className="flex items-center gap-2 text-sm hover:bg-gray-100 sm:text-base"
                >
                  <Link to="/blog">
                    <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Terug naar blog
                  </Link>
                </Button>
              </div>
            </article>

            {/* Sidebar - Casino Bonuses */}
            <aside className="mt-8 w-full lg:mt-0 lg:w-[380px]">
              <div className="space-y-8 lg:sticky lg:top-24">
                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg sm:rounded-2xl sm:p-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold sm:mb-6 sm:text-xl">
                  <span className="h-5 w-1 rounded-full bg-gokkerz-green sm:h-6 sm:w-1.5"></span>
                  Alle Nederlandse Online Casinos
                </h2>
                <div className="divide-y divide-gray-100">
                  {casinos.slice(0, 5).map((casino) => (
                    <div key={casino.id} className="p-3.5 transition-colors hover:bg-gray-50">
                      <div className="flex items-stretch gap-5">
                        {/* Logo Column */}
                        <div className="flex w-[100px] flex-shrink-0 items-center">
                          <div className="relative h-full w-full flex items-center justify-center">
                            <img
                              src={casino.logo}
                              alt={`${casino.name} logo`}
                              className={`h-24 w-24 object-contain ${casino.logoClassName}`}
                              loading="lazy"
                            />
                          </div>
                        </div>

                        {/* Content Column */}
                        <div className="flex min-w-0 flex-1 flex-col justify-center space-y-2">
                          {/* Title row with rating */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center rounded-full bg-gray-50/80 px-1.5 py-0.5">
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                              <span className="ml-0.5 text-sm font-semibold tabular-nums">{casino.rating}</span>
                            </div>
                            <h3 className="truncate text-[15px] font-bold text-gray-900 leading-none">{casino.name}</h3>
                          </div>
                          
                          {/* Bonus en Features */}
                          <div className="flex flex-col space-y-2">
                            <div className="text-left">
                              <span className="text-[13px] font-medium text-green-600 leading-none">
                                {casino.bonus.split('+')[0].trim()}
                              </span>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              {casino.features.slice(0, 2).map((feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-center leading-none"
                                >
                                  <Check className="mr-1.5 h-3 w-3 flex-shrink-0 text-green-600" />
                                  <span className="text-[13px] text-gray-600">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Actions Column */}
                        <div className="flex w-[100px] flex-shrink-0 flex-col justify-center gap-3 py-1">
                          <Button
                            className="w-full bg-green-600 px-0 py-3 text-xs font-medium text-white shadow-sm transition-colors hover:bg-green-700"
                            asChild
                          >
                            <a
                              href={getCasinoUrl(casino.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Bezoek ${casino.name}`}
                            >
                              Speel Nu
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full px-0 py-3 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                            asChild
                          >
                            <Link
                              to={`/casinos/${casino.name.toLowerCase().replace(/[']/g, '').replace(/\s+/g, '-')}`}
                              aria-label={`Bekijk ${casino.name} review`}
                            >
                              Review
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 sm:mt-6">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-gokkerz-green to-green-600 text-sm text-white hover:opacity-90 sm:text-base"
                  >
                    <Link to="/casinos">Bekijk alle casino's</Link>
                  </Button>
                </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Articles */}
          <section className="mt-12 border-t pt-12 sm:mt-16 sm:pt-16">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold sm:mb-8 sm:text-2xl">
              <span className="h-5 w-1 rounded-full bg-gokkerz-green sm:h-6 sm:w-1.5"></span>
              Lees ook deze artikelen
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {recentBlogs.map((blog) => (
                <BlogPostCard key={blog.id} post={blog} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            image: post.image,
            datePublished: post.date,
            author: {
              '@type': 'Person',
              name: post.author,
              description: "Expert op het gebied van online casino's en gambling in Nederland",
            },
            publisher: {
              '@type': 'Organization',
              name: 'Gokkerz.nl',
              logo: {
                '@type': 'ImageObject',
                url: '/assets/Gokkerz.nl.svg',
              },
            },
            articleBody: post.content,
            keywords: [
              post.category,
              'online casino',
              'gokken',
              'casino bonussen',
              'nederlands casino',
            ].join(', '),
            description: post.excerpt,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': window.location.href,
            },
          }),
        }}
      />

      {/* Vercel Analytics */}
      <Analytics />
      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </Layout>
  );
};

export default BlogPost;
