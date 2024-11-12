import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import NotFound from "./NotFound";

const ProposalDetailsPage = () => {
    const { proposalId } = useParams();
    const [proposal, setProposal] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const fetchProposalDetails = async () => {
            try {
                const response = await axios.get(`/talks/${proposalId}`);
                setProposal(response.data);
            } catch (error) {
                console.error("Error fetching proposal details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProposalDetails();
    }, [proposalId]);

    if (loading) {
        return <Loading />;
    }

    if (!proposal) {
        return <NotFound />;
    }

    return (
        <div>
            <h1>{proposal.title}</h1>
            <p>Speaker: {proposal.speaker}</p>
            <p>Category: {proposal.category}</p>
            {proposal.description.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            <button onClick={() => history.push("/proposals")}>Back to Proposals</button>
        </div>
    );
};

export default ProposalDetailsPage;