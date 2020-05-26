import React, { useContext } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import { UserContext } from "../../Root";

const LikeTrack = ({ classes, trackId, likeCount }) => {
  const { likeSet } = useContext(UserContext);
  const disabled = likeSet.map((like) => trackId === like.id);

  return (
    <Mutation mutation={CREATE_LIKE} variables={{ trackId }}>
      {(createLike) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            createLike();
          }}
          disabled={disabled}
          className={classes.iconButton}
        >
          {likeCount}
          <ThumbUpIcon className={classes.icon} />
        </IconButton>
      )}
    </Mutation>
  );
};

const CREATE_LIKE = gql`
  mutation($trackId: Int!) {
    createLike(trackId: $trackId) {
      track {
        id
        likes {
          id
        }
      }
    }
  }
`;

const styles = (theme) => ({
  iconButton: {
    color: "deeppink",
  },
  icon: {
    marginLeft: theme.spacing.unit / 2,
  },
});

export default withStyles(styles)(LikeTrack);
