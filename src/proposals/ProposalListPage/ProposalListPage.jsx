import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";

const ProposalListPage = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const [talksResponse, statusesResponse] = await Promise.all([
                    axios.get("/talks"),
                    axios.get("/callForPapers"),
                ]);

                const talks = talksResponse.data;
                const statuses = statusesResponse.data;

                const mergedProposals = talks.map(talk => {
                    const status = statuses.byTalkId[talk.id]?.status || "unknown";
                    return { ...talk, status };
                });

                setProposals(mergedProposals);
            } catch (error) {
                console.error("Error fetching proposals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProposals();
    }, []);

    const handleAccept = async (id) => {
        try {
            await axios.post(`/callForPapers/${id}/accept`);
            setProposals(proposals.map(proposal => 
                proposal.id === id ? { ...proposal, status: "accepted" } : proposal
            ));
        } catch (error) {
            console.error("Error accepting proposal:", error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`/callForPapers/${id}/reject`);
            setProposals(proposals.map(proposal => 
                proposal.id === id ? { ...proposal, status: "rejected" } : proposal
            ));
        } catch (error) {
            console.error("Error rejecting proposal:", error);
        }
    };

    const getStatusDescription = (status) => {
        switch (status) {
            case "accepted":
                return "accepted";
            case "rejected":
                return "rejected";
            case "pending":
                return "to be decided";
            default:
                return "(unknown)";
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "accepted":
                return "ProposalRow--accepted";
            case "rejected":
                return "ProposalRow--rejected";
            case "pending":
                return "ProposalRow--pending";
            default:
                return "ProposalRow--unknown";
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            {proposals.map(proposal => (
                <div
                    key={proposal.id}
                    data-testid={`proposal-id-${proposal.id}`}
                    className={`${getStatusClass(proposal.status)}`}
                    onClick={() => history.push(`/proposals/${proposal.id}`)}
                >
                    <h3>{proposal.title}</h3>
                    <p>{proposal.speaker}</p>
                    <p>category: {proposal.category}</p>
                    <p>status: {getStatusDescription(proposal.status)}</p>
                    <div className={`StatusBar ${getStatusClass(proposal.status)}`} />
                    {proposal.status !== "accepted" && (
                        <button onClick={(e) => { e.stopPropagation(); handleAccept(proposal.id); }}>
                            Accept
                        </button>
                    )}
                    {proposal.status !== "rejected" && (
                        <button onClick={(e) => { e.stopPropagation(); handleReject(proposal.id); }}>
                            Reject
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProposalListPage;