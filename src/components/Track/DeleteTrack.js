import React, { useContext } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/DeleteForeverOutlined";

import { UserContext } from "../../Root";
import { GET_TRACKS } from "../../pages/App";

const DeleteTrack = ({ track }) => {
  const currentUser = useContext(UserContext);
  const isCurrentUser = currentUser.id === track.postedBy.id;

  return (
    isCurrentUser && (
      <Mutation
        mutation={DELETE_TRACK}
        variables={{ trackId: track.id }}
        refetchQueries={() => [{ query: GET_TRACKS }]}
      >
        {(deleteTrack) => (
          <IconButton>
            <TrashIcon />
          </IconButton>
        )}
      </Mutation>
    )
  );
};

const DELETE_TRACK = gql`
  mutation($trackId: Int!) {
    deleteTrack(trackId: $trackId) {
      id
    }
  }
`;

export default DeleteTrack;
