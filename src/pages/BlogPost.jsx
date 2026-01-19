import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag, Copy, Check, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogs } from '../data';
import TableOfContents from '../components/TableOfContents';

const blogContent = import.meta.glob('../content/blogs/*.md', { query: '?raw', import: 'default' });

const CodeBlock = ({ children, ...props }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        // Extract text from children (which is usually a <code> element)
        let textToCopy = '';
        if (children && children.props && children.props.children) {
            textToCopy = children.props.children;
        } else if (typeof children === 'string') {
            textToCopy = children;
        }

        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group mb-4">
            <button
                onClick={handleCopy}
                className="absolute right-2 top-2 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                title="Copy to clipboard"
            >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
            <pre className="whitespace-pre-wrap break-words bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-x-hidden pt-10" {...props}>
                {children}
            </pre>
        </div>
    );
};

const BlogPost = () => {
    const { id } = useParams();
    const blog = blogs.find(b => b.id === id);
    const [content, setContent] = useState('');

    useEffect(() => {
        const loadContent = async () => {
            const path = `../content/blogs/${id}.md`;
            if (blogContent[path]) {
                const text = await blogContent[path]();
                setContent(text);
            }
        };
        loadContent();
    }, [id]);

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
                <Link to="/" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                    <ArrowLeft size={20} /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen pt-24 pb-20 relative">


            {/* Hero Image */}
            <div className="relative h-[40vh] w-full mb-12 overflow-hidden">
                <img
                    src={blog.image}
                    alt={blog.topic}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="max-w-4xl mx-auto">
                        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors">
                            <ArrowLeft size={20} /> Back to Articles
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
                        >
                            {blog.topic}
                        </motion.h1>
                        <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{blog.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag size={16} />
                                <span>{blog.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>5 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Layout */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex gap-12 relative items-start">
                    {/* Sticky Table of Contents Sidebar */}
                    <div className="hidden xl:block sticky top-32 h-fit shrink-0">
                        <TableOfContents content={content} />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 max-w-3xl">
                        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-strong:text-white prose-code:text-cyan-300 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
                            <ReactMarkdown
                                components={{
                                    h2: ({ node, ...props }) => {
                                        const getText = (children) => {
                                            if (typeof children === 'string') return children;
                                            if (Array.isArray(children)) {
                                                return children.map(child => getText(child)).join('');
                                            }
                                            if (children?.props?.children) {
                                                return getText(children.props.children);
                                            }
                                            return '';
                                        };
                                        const id = getText(props.children).toLowerCase().replace(/[^\w]+/g, '-');
                                        return <h2 id={id} {...props} />;
                                    },
                                    h3: ({ node, ...props }) => {
                                        const getText = (children) => {
                                            if (typeof children === 'string') return children;
                                            if (Array.isArray(children)) {
                                                return children.map(child => getText(child)).join('');
                                            }
                                            if (children?.props?.children) {
                                                return getText(children.props.children);
                                            }
                                            return '';
                                        };
                                        const id = getText(props.children).toLowerCase().replace(/[^\w]+/g, '-');
                                        return <h3 id={id} {...props} />;
                                    },
                                    pre: CodeBlock,
                                    code: ({ node, ...props }) => (
                                        <code className="whitespace-pre-wrap break-words" {...props} />
                                    ),
                                    blockquote: ({ node, ...props }) => (
                                        <details className="bg-slate-900 border border-slate-800 rounded-lg p-4 my-4 group">
                                            <summary className="font-bold text-cyan-400 cursor-pointer list-none flex items-center gap-2">
                                                Example <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                                            </summary>
                                            <div className="mt-2 text-slate-300 italic">
                                                {props.children}
                                            </div>
                                        </details>
                                    )
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-slate-800">
                            <h3 className="text-white font-bold mb-4">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {blog.tech.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-900 text-slate-300 rounded-full text-sm border border-slate-800">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article >
    );
};

export default BlogPost;
