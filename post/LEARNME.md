---
title: 'Web Development Recap + Next Basics'
date: '2022-03-31'
---

# Web Development Recap + Next Basics
If you need to review your web development knowledge and you want to develop something using the React library start from here! 

## 🚨 BREAK IN CASE of EMERGENCY
### Essential Javascript

Essential JavaScript for React.
While you can learn JavaScript and React at the same time, being familiar with JavaScript can make the process of learning React easier. Here's a summary of the JavaScript foundamental topics:

-   [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) and [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
-   [Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
-   [Arrays and array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
-   [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
-   [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
-   [Ternary Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
-   [ES Modules and Import / Export Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
\
&nbsp;

# 📖 Building Blocks of a Web Application
There are a few things you need to consider when building modern applications. Such as:

1. __User Interface__
how users will consume and interact with your application.

2. __Routing__ 
how users navigate between different parts of your application.

3. __Data Fetching__ 
where your data lives and how to get it.

4. __Rendering__
when and where you render static or dynamic content.

5. __Integrations__ 
what third-party services you use (CMS, auth, payments, etc) and how you connect to them.

6. __Infrastructure__
where you deploy, store, and run your application code (Serverless, CDN, Edge, etc).

7. __Performance__
how to optimize your application for end-users.

8. __Scalability__ 
how your application adapts as your team, data, and traffic grow.

9. __Developer Experience__ 
your team’s experience building and maintaining your application.

\
&nbsp;

# Why React?

### Javascript is imperative, React make it declarative
Imperative programming is like giving a chef step-by-step instructions on how to make a pizza. 
Declarative programming is like ordering a pizza without being concerned about the steps it takes to make the pizza. 🍕
A popular declarative library that helps developers build user interfaces is React.

### You can cut down a lot of repetitive code
And this is exactly what React does, it’s a library that contains reusable snippets of code that perform tasks on your behalf - in this case, updating the UI.

### JSX -> Javascript + Html
JSX is a syntax extension for JavaScript that allows you to describe your UI in a familiar HTML-like syntax. 
Note that browsers don’t understand JSX out of the box, so you’ll need a __JavaScript compiler__, such as a Babel, to transform your JSX code into regular JavaScript.

##### JSX rules
1. __Return a single root element__ 
return ( <div> ... </div>)  
return ( <div> ... </div> <div> ... </div> ) WRONG!
2. __Close every tag, even the self closing (<img> should be <img />)__
3. __camelCase everything__
why? JSX turns into JavaScript and attributes written in JSX become keys of JavaScript objects. In your own components, you will often want to read those attributes into variables. But JavaScript has limitations on variable names. For example, their names can’t contain dashes or be reserved words like class. For example, instead of stroke-width you use strokeWidth


### React Core Concepts

There are three core concepts of React that you'll need to be familiar with to start building React applications. These are:

- __Components__
- __Props__
- __State__
    You can think of state as any information in your UI that changes over time, usually triggered by user ```{ const [likes, setLikes] = React.useState(0) }```



☞ __Iteration of elements__ starting from array:
You can then use the array.map() method to iterate over the array and use an arrow function to map a name to a list item:

    {names.map(name => (
        <li key={name}>{name}</li>
    ))}

\
&nbsp;
# Nextjs
Next.js is an open-source web development framework built on top of Node.js enabling React based web applications functionalities such as server-side rendering and generating static websites. 
## Why Next JS?
### pre-rendering and DATA FETCHING
By default, Next.js pre-renders every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript.
Pre-rendering can result in better performance and SEO.
Next.js has pre-rendered the app into static HTML, allowing you to see the app UI without running JavaScript.

Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in __when__ it generates the HTML for a page.

__Static Generation__ is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
__Server-side Rendering__ is the pre-rendering method that generates the HTML on each request.

You should ask yourself: __"Can I pre-render this page ahead of a user's request?"__ If the answer is yes, then you should choose Static Generation.
On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use Server-side Rendering. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.

__Static Generation with Data__

Essentially, __getStaticProps__ allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!” 
 __getStaticProps only runs on the server-side.__ It will never run on the client-side. It won’t even be included in the JS bundle for the browser. That means you can write code such as direct database queries without them being sent to browsers.
In development (npm run dev or yarn dev), getStaticProps runs on every request.
In production, getStaticProps runs at build time. However, this behavior can be enhanced using the fallback key returned by getStaticPaths
Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.
Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.


You should use __getServerSideProps__ only if you need to pre-render a page whose data must be fetched at request time. Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request, and the result cannot be cached by a CDN without extra configuration.


The team behind Next.js has created a React hook for data fetching called __SWR__. We highly recommend it __if you’re fetching data on the client side__. It handles caching, revalidation, focus tracking, refetching on interval, and more. We won’t cover the details here, but here’s an example usage:
    npm install swr

    import useSWR from 'swr'

    function Profile() {
    const { data, error } = useSWR('/api/user', fetch)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return <div>hello {data.name}!</div>
    }

### Main App
To load global CSS files, create a file called pages/_app.js with the following content:

    export default function App({ Component, pageProps }) {
      return <Component {...pageProps} />
    }

This App component is the top-level component which will be common across all the different pages. 
__You can use this App component to keep state when navigating between pages__


### Dynamic Routing
Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. For example:
pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.

### Creating API Routes
API Routes let you create an API endpoint inside a Next.js app. You can do so by creating a function inside the pages/api directory that has the following format:

    // req = HTTP incoming message, res = HTTP server response
    export default function handler(req, res) {
      // ...
    }

A good use case for API Routes is handling form input. For example, you can create a form on your page and have it send a POST request to your API Route. You can then write code to directly save it to your database. The API Route code will not be part of your client bundle, so you can safely write server-side code.

API routes support dynamic routes.
For example, the API route __pages/api/post/[pid].js__ has the following code:

    export default function handler(req, res) {
      const { pid } = req.query
      res.end(`Post: ${pid}`)
    }

# Extra Libraries
### Use Markdown files to store data

You might have noticed that each markdown file has a metadata section at the top containing title and date. 
This is called YAML Front Matter, which can be parsed using a library called gray-matter.

    npm install gray-matter

Render markdown content:

    npm install remark remark-html


### Formatting the date
    npm install date-fns


## Extra Developer Utils

### backtick for string interpolation
If you are programming on mac the backtick is made by pressing: __option + 9__
If you are programming on windows: __alt + 96__

### emoji shortcut on macOS
__control + cmd + space bar__

