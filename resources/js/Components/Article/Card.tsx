import { useEditableArticle } from '@/Hooks/useEditableArticle';
import { Article } from '@/types';
import Image from './Image';
import Title from './Title';
import Price from './Price';
import Description from './Description';
import Hide from '../Icons/Hide';
import Delete from '../Icons/Delete';
import Edit from '../Icons/Edit';
import Save from '../Icons/Save';
import SquareX from '../Icons/SquareX';

interface ArticleCardProps {
    article: Article;
    onUpdate?: () => void | Promise<void>;
}

export default function ArticleCard({ article, onUpdate }: ArticleCardProps) {    const {
        title,
        setTitle,
        price,
        setPrice,
        body,
        setBody,
        isEditing,
        startEditing,
        cancelEditing,
        saveChanges,
    } = useEditableArticle(article, onUpdate);

    return (
        <li
            className={`flex w-full flex-col gap-4 rounded-md p-4 transition-all duration-300 ease-in-out ${
                isEditing ? 'bg-blue-50 text-blue-700' : 'bg-gray-100'
            }`}
        >
            <div className="flex gap-4">
                <Image />
                <div className="flex flex-col gap-2">
                    <Title
                        title={title}
                        active={isEditing}
                        onChange={setTitle}
                    />
                    <Price
                        price={price}
                        active={isEditing}
                        onChange={setPrice}
                    />
                </div>
            </div>

            <div className="flex h-full flex-col justify-between gap-4">
                <Description
                    description={body}
                    active={isEditing}
                    onChange={setBody}
                />
            </div>

            <div className="ml-auto flex gap-2">
                <Hide cursor={true} hide={isEditing} />
                {isEditing ? (
                    <>
                        <button onClick={saveChanges}>
                            <Save cursor={true} />
                        </button>
                        <button onClick={cancelEditing}>
                            <SquareX cursor={true} />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={startEditing}>
                            <Edit cursor={true} />
                        </button>
                        <Delete cursor={true} />
                    </>
                )}
            </div>
        </li>
    );
}
