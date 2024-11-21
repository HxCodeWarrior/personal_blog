import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  InfoCardWrapper, 
  AvatarSection,
  InfoSection,
  Name,
  Role,
  InfoItem,
  SkillsContainer,
  ActionButtons
} from './styles';
import { InfoCardProps } from './types';
import { cardVariants, avatarVariants, skillVariants } from './animations';
import { 
  EmailIcon, 
  PhoneIcon, 
  LocationIcon, 
  LinkedInIcon,
  GitHubIcon,
  TwitterIcon
} from './icons';
import { Button } from '../../../common/Button';

export const InfoCard: React.FC<InfoCardProps> = ({
  userInfo,
  onEdit,
  onConnect,
  ...props
}) => {
  return (
    <InfoCardWrapper>
      <motion.div
        className="info-card-wrapper"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <AvatarSection>
          <motion.img
            src={userInfo.avatar}
            alt={userInfo.name}
            className="avatar"
            variants={avatarVariants}
          />
        </AvatarSection>

        <InfoSection>
          <Name>{userInfo.name}</Name>
          <Role>{userInfo.role}</Role>
          {userInfo.department && (
            <InfoItem>{userInfo.department}</InfoItem>
          )}

          <InfoItem>
            <EmailIcon />
            {userInfo.email}
          </InfoItem>

          {userInfo.phone && (
            <InfoItem>
              <PhoneIcon />
              {userInfo.phone}
            </InfoItem>
          )}

          {userInfo.location && (
            <InfoItem>
              <LocationIcon />
              {userInfo.location}
            </InfoItem>
          )}

          {userInfo.skills && (
            <SkillsContainer>
              <AnimatePresence>
                {userInfo.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    className="skill"
                    variants={skillVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </AnimatePresence>
            </SkillsContainer>
          )}

          <ActionButtons>
            {onConnect && (
              <Button
                buttonType="primary"
                onClick={onConnect}
                block
              >
                Connect
              </Button>
            )}
            {onEdit && (
              <Button
                buttonType="default"
                onClick={onEdit}
                block
              >
                Edit Profile
              </Button>
            )}
          </ActionButtons>
        </InfoSection>
      </motion.div>
    </InfoCardWrapper>
  );
};

export default InfoCard; 