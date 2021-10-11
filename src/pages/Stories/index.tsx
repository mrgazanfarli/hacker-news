import React, { ChangeEvent } from 'react';
import { AppLayout } from 'components/Layout';
import { useHistory, useParams } from 'react-router-dom';
import { EStoryType } from 'models/enums';
import { hasEnumValue } from 'utils';
import { Card, CardBody, CardFooter, Col, Input, Label, Row } from 'reactstrap';
import { isError, isPending, isSuccess } from 'utils/redux';
import LoadingSpinner from 'components/Loading';
import range from 'lodash/range';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState, IAsyncData } from 'models';
import { getStories, getStoryIds } from 'actions/stories';
import { IStory } from 'services/stories/models';

interface IParams {
    storyType: EStoryType;
}

const LIMIT_OPTIONS: number[] = [5, 10, 20, 30, 40];

const StoriesPage: React.FC = () => {
    const params = useParams<IParams>();
    const history = useHistory();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(LIMIT_OPTIONS[1]);
    const storyIdsBranch = useSelector<IAppState, IAsyncData<number[]>>((state) => state.storyIds);
    const storiesBranch = useSelector<IAppState, IAsyncData<IStory[]>>((state) => state.stories);
    const [enablePreviews, setPreviewsEnabled] = React.useState(false);

    if (!params.storyType || !hasEnumValue(EStoryType, params.storyType)) {
        history.push('/stories/new')
    }

    React.useEffect(() => {
        dispatch(getStoryIds(params.storyType));
    }, [dispatch, params.storyType]);

    React.useEffect(() => {
        if (isSuccess(storyIdsBranch)) {
            dispatch(getStories(limit, page));
        }
    }, [page, limit, dispatch, storyIdsBranch]);

    const handleLimitChange = React.useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setLimit(+event.target.value);
    }, []);
    const handlePageChange = React.useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        setPage(+event.target.value);
    }, []);

    const pageCount = React.useMemo(() => {
        if (isSuccess(storyIdsBranch)) {
            return Math.ceil(storyIdsBranch.data.length / limit);
        }
    }, [limit, storyIdsBranch]);

    const handlePreviewToggle = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPreviewsEnabled(event.target.checked);
    }, []);

    return (
        <AppLayout>
            {(isPending(storyIdsBranch) || isPending(storiesBranch)) && (
                <Row className="py-4 d-flex justify-content-center">
                    <LoadingSpinner />
                </Row>
            )}

            {isSuccess(storyIdsBranch) && (isSuccess(storiesBranch)) && (
                <>
                    <Row className="py-4 position-sticky">
                        <Col xs={3}>
                            <Label>Items per page</Label>
                            <select value={limit} onChange={handleLimitChange} className="form-control mt-2">
                                {LIMIT_OPTIONS.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </Col>
                        {!!pageCount && (
                            <Col xs={3}>
                                <Label>Page</Label>
                                <select value={page} onChange={handlePageChange} className="form-control mt-2">
                                    {range(1, pageCount + 1).map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </Col>
                        )}
                        <Col xs={12} className="mt-3">
                            <div className="d-flex align-items-center pl-4">
                                <Input type="checkbox" checked={enablePreviews} onChange={handlePreviewToggle} />
                                <Label>Enable previews (this can consume more data)</Label>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        {storiesBranch.data.map(story => (
                            <Col xs={12} className="mb-3" key={story.id}>
                                <Card className="p-3">
                                    <a href={story.url} rel="noreferrer" target="_blank" className="h3 text-primary">{story.title}</a>
                                    {enablePreviews && (
                                        <CardBody>
                                            <iframe title={story.title} loading="lazy" width="100%" src={story.url} />
                                        </CardBody>
                                    )}
                                    <CardFooter>
                                        <p className="text-muted">Written by: {story.by}</p>
                                    </CardFooter>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </>
            )}

            {(isError(storiesBranch) || isError(storyIdsBranch)) && (
                <Row className="py-4">
                    <h3 className="text-danger">Sorry, there is something wrong. Tyr again a bit later :(</h3>
                </Row>
            )}
        </AppLayout>
    )
}

export default StoriesPage;
